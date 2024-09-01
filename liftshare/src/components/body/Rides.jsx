import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../header/Nav';
import Card from './Card';
import Header from '../header/Header';

const GeoNamesAPI = {
  username: 'rayais',
  baseUrl: 'http://api.geonames.org',
};

function Rides() {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [startCity, setStartCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5410/ride')
      .then(response => {
        setRides(response.data);
        setFilteredRides(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching rides:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${GeoNamesAPI.baseUrl}/childrenJSON?geonameId=2464461&username=${GeoNamesAPI.username}`)
      .then(response => {
        setStates(response.data.geonames);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios.get(`${GeoNamesAPI.baseUrl}/searchJSON?adminCode1=${selectedState}&country=TN&username=${GeoNamesAPI.username}`)
        .then(response => {
          setCities(response.data.geonames);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleStartCityChange = (event) => {
    setStartCity(event.target.value);
  };

  const handleDestinationCityChange = (event) => {
    setDestinationCity(event.target.value);
  };

  useEffect(() => {
    const filterRides = () => {
      const filtered = rides.filter(ride => {
        const trajectory = ride.trajectory.map(ci => ci.city.toLowerCase());
    
        // Case 1: Both startCity and destinationCity are filled
        if (startCity && destinationCity) {
          const startIndex = trajectory.indexOf(startCity.toLowerCase());
          const destinationIndex = trajectory.indexOf(destinationCity.toLowerCase());
          
          return startIndex !== -1 && destinationIndex !== -1 && startIndex < destinationIndex;
        }
    
        // Case 2: Only startCity is filled
        if (startCity) {
          return trajectory.includes(startCity.toLowerCase());
        }
    
        // Case 3: Only destinationCity is filled
        if (destinationCity) {
          return trajectory.includes(destinationCity.toLowerCase());
        }
    
        // If neither startCity nor destinationCity is filled, return all rides
        return true;
      });
      setFilteredRides(filtered);
    
    };
    filterRides();
}, [startCity, destinationCity]);

  return (
    <div>
      <Header  />
      <div className="mt-32 p-4 flex flex-col items-center">
        <div className="mb-4 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">Filter Rides</h2>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-bold mb-1">From</label>
              <div className="flex space-x-4">
                <select className="w-full p-2 border border-gray-300 rounded" onChange={handleStateChange}>
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.geonameId} value={state.adminCode1}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <select className="w-full p-2 border border-gray-300 rounded" onChange={handleStartCityChange}>
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.geonameId} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-bold mb-1">To</label>
              <div className="flex space-x-4">
                <select className="w-full p-2 border border-gray-300 rounded" onChange={handleStateChange}>
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.geonameId} value={state.adminCode1}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <select className="w-full p-2 border border-gray-300 rounded" onChange={handleDestinationCityChange}>
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.geonameId} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl">

          { (
            filteredRides.map((ride, index) => (
              <div key={index} >
                
                <Card props={ride} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Rides;
