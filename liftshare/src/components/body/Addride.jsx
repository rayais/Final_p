import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../header/Nav';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// This is the data to use GeoNames
const GeoNamesAPI = {
  username: 'rayais',
  baseUrl: 'http://api.geonames.org'
};

// Component function
function Addride() {
  const [passingByFields, setPassingByFields] = useState([{}]);
  const [isDaily, setIsDaily] = useState(false);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    fromState: '',
    fromCity: '',
    toState: '',
    toCity: '',
    passingBy: [],
    departureTime: '',
    returnTime: '',
    isDaily: false,
    days: [],
    date: '',
    carModel: '',
    carPictures: [],
    description: '',
    cost: '',
    places: 1
  });
  const [cities, setCities] = useState({
    fromCities: [],
    passingByCities: [],
    toCities: []
  });
  const navigate=useNavigate()
  useEffect(() => {
    axios.get(`${GeoNamesAPI.baseUrl}/childrenJSON?geonameId=2464461&username=${GeoNamesAPI.username}`)
      .then(response => {
        setStates(response.data.geonames);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  const fetchCities = (stateCode, type, index = 0) => {
    if (stateCode) {
      axios.get(`${GeoNamesAPI.baseUrl}/searchJSON?adminCode1=${stateCode}&country=TN&username=${GeoNamesAPI.username}`)
        .then(response => {
          const updatedCities = { ...cities };
          if (type === 'from') {
            updatedCities.fromCities = response.data.geonames;
          } else if (type === 'to') {
            updatedCities.toCities = response.data.geonames;
          } else if (type === 'passingBy') {
            updatedCities.passingByCities[index] = response.data.geonames;
          }
          setCities(updatedCities);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    } else {
      const updatedCities = { ...cities };
      if (type === 'from') {
        updatedCities.fromCities = [];
      } else if (type === 'to') {
        updatedCities.toCities = [];
      } else if (type === 'passingBy') {
        updatedCities.passingByCities[index] = [];
      }
      setCities(updatedCities);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStateChange = (event, type, index = 0) => {
    const stateCode = event.target.value;
    if (type === 'from') {
      setFormData({ ...formData, fromState: stateCode, fromCity: '' });
      fetchCities(stateCode, 'from');
    } else if (type === 'to') {
      setFormData({ ...formData, toState: stateCode, toCity: '' });
      fetchCities(stateCode, 'to');
    } else if (type === 'passingBy') {
      const updatedPassingByFields = [...passingByFields];
      updatedPassingByFields[index] = { ...updatedPassingByFields[index], state: stateCode, city: '' };
      setPassingByFields(updatedPassingByFields);
      fetchCities(stateCode, 'passingBy', index);
    }
  };

  const handleCityChange = (event, type, index = 0) => {
    const city = event.target.value;
    if (type === 'from') {
      setFormData({ ...formData, fromCity: city });
    } else if (type === 'to') {
      setFormData({ ...formData, toCity: city });
    } else if (type === 'passingBy') {
      const updatedPassingByFields = [...passingByFields];
      updatedPassingByFields[index] = { ...updatedPassingByFields[index], city };
      setPassingByFields(updatedPassingByFields);
    }
  };

  const addPassingByField = () => {
    setPassingByFields([...passingByFields, {}]);
  };

  const handleDailyChange = () => {
    setIsDaily(!isDaily);
    setFormData({
      ...formData,
      isDaily: !isDaily
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch user details using the token stored in local storage
    const token = localStorage.getItem('token');
    try {
      const userResponse = await axios.get('http://localhost:5410/getuser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { name, email, picture,fblink } = userResponse.data;

      const trajectory = [
        { state: formData.fromState, city: formData.fromCity },
        ...passingByFields,
        { state: formData.toState, city: formData.toCity }
      ];

      const dataToSubmit = {
        ...formData,
        trajectory,
        driver: name,
        email,
        profPic:picture,
        fblink
      };
      //////////image cloudinary process
      if (formData.carPictures[0]) {
        const imageData = new FormData();
        imageData.append('file', formData.carPictures[0]); 
        imageData.append('upload_preset', 'proimag');
        try {
          const response = await axios.post('https://api.cloudinary.com/v1_1/drawpzs79/image/upload', imageData); // Replace with your Cloudinary cloud name
          formData.carPictures[0] = response.data.secure_url;
        } catch (error) {
          console.error('Error uploading image:', error);
          return;
        }
      }

      /////////
      console.log("data to submit :",dataToSubmit);

      const response = await axios.post('http://localhost:5410/ride', dataToSubmit);
      console.log('Ride added successfully:', response.data);
    } catch (error) {
      console.error('Error adding ride:', error);
    }
    //navigate to home page
    navigate('/')
  };

  return (
    <div>
      <Nav />
      <div className="flex items-center justify-center min-h-screen mt-12 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Trajectory Information</h2>
              <div className="mb-4">
                <label className="block font-bold mb-1">From</label>
                <div className="flex space-x-4">
                  <select
                    name="fromState"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) => handleStateChange(e, 'from')}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.geonameId} value={state.adminCode1}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="fromCity"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) => handleCityChange(e, 'from')}
                  >
                    <option value="">Select City</option>
                    {cities.fromCities.map(city => (
                      <option key={city.geonameId} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {passingByFields.map((_, index) => (
                <div key={index} className="mb-4">
                  {index === 0 && <label className="block font-bold mb-1">Passing by</label>}
                  <div className="flex space-x-4">
                    <select
                      name={`passingByState-${index}`}
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={(e) => handleStateChange(e, 'passingBy', index)}
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state.geonameId} value={state.adminCode1}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name={`passingByCity-${index}`}
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={(e) => handleCityChange(e, 'passingBy', index)}
                    >
                      <option value="">Select City</option>
                      {cities.passingByCities[index]?.map(city => (
                        <option key={city.geonameId} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {index === passingByFields.length - 1 && (
                      <button
                        type="button"
                        onClick={addPassingByField}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="mb-4">
                <label className="block font-bold mb-1">To</label>
                <div className="flex space-x-4">
                  <select
                    name="toState"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) => handleStateChange(e, 'to')}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.geonameId} value={state.adminCode1}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="toCity"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) => handleCityChange(e, 'to')}
                  >
                    <option value="">Select City</option>
                    {cities.toCities.map(city => (
                      <option key={city.geonameId} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Time Information</h2>
              <div className="mb-4">
                <label className="block font-bold mb-1">Time of Departure</label>
                <input
                  type="time"
                  name="departureTime"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Time of Return</label>
                <input
                  type="time"
                  name="returnTime"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleInputChange}
                  
                />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isDaily"
                    className="form-checkbox"
                    checked={isDaily}
                    onChange={handleDailyChange}
                  />
                  <span className="ml-2">Daily</span>
                </label>
              </div>
              {isDaily ? (
                <div className="mb-4">
                  <label className="block font-bold mb-1">Days</label>
                  <div className="flex flex-wrap">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <label key={day} className="inline-flex items-center mr-4 mb-2">
                        <input
                          type="checkbox"
                          name="days"
                          value={day}
                          className="form-checkbox"
                          onChange={(e) => {
                            const newDays = e.target.checked
                              ? [...formData.days, day]
                              : formData.days.filter(d => d !== day);
                            setFormData({ ...formData, days: newDays });
                          }}
                        />
                        <span className="ml-2">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block font-bold mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block font-bold mb-1">Cost (TND)</label>
              <input
                type="number"
                name="cost"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleInputChange}
                value={formData.cost}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1">Number of Places</label>
              <select
                name="places"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleInputChange}
                value={formData.places}
              >
                {[...Array(10).keys()].map(n => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Car Information</h2>
              <div className="mb-4">
                <label className="block font-bold mb-1">Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Car Model"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Car Pictures</label>
                <input
                  type="file"
                  name="carPictures"
                  className="w-full p-2 border border-gray-300 rounded"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setFormData({ ...formData, carPictures: files });
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <textarea
                name="description"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Description"
                rows="4"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
              <Link to='/'>
              <button type="button" className="bg-gray-500 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addride;
