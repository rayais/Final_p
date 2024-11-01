import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Card from './Card';

function Profile() {
  const [userDetails, setUserDetails] = useState({ name: '', email: '', picture: '' });
  const [userRides, setUserRides] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedDetails, setModifiedDetails] = useState({ name: '', email: '', picture: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5410/getuser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      const userData = response.data;
      if (!userData.picture) {
        userData.picture = 'https://icons.veryicon.com/png/o/miscellaneous/template-1/profile-19.png';
      }
      setUserDetails(userData);
      setModifiedDetails({ name: userData.name, email: userData.email, picture: userData.picture });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  useEffect(() => {
    if (userDetails.email) {
      const email = userDetails.email;
      axios.get('http://localhost:5410/mailride', {
        headers: {
          Authorization: `Bearer ${email}`,
        },
      })
      .then(response => {
        setUserRides(response.data);
      })
      .catch(error => {
        console.error('Error fetching user rides:', error);
      });
    }
  }, [userDetails.email]);

  const handleDeleteRide = (rideId) => {
    axios.delete(`http://localhost:5410/ride/${rideId}`)
      .then(() => {
        setUserRides(prevRides => prevRides.filter(ride => ride._id !== rideId));
      })
      .catch(error => {
        console.error('Error deleting ride:', error);
      });
  };

  const handleModifyRide = (rideId) => {
    // Navigate to the ride modification page or open a modal
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      let imageUrl = modifiedDetails.picture;

      // Upload to Cloudinary if a new image was selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'carpic'); // Replace with your Cloudinary upload preset

        const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/drawpzs79/image/upload', formData); // Replace 'your_cloud_name' with your Cloudinary cloud name
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5410/user', {
        name: modifiedDetails.name,
        email: modifiedDetails.email,
        picture: imageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserDetails({ ...modifiedDetails, picture: imageUrl });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setModifiedDetails({ ...modifiedDetails, picture: URL.createObjectURL(file) });
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto mt-20 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
        <div className="flex items-center mb-4">
          <img src={modifiedDetails.picture} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
          <div className="flex-grow">
            <div className="mb-2">
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={modifiedDetails.name}
                readOnly={!isEditing}
                onChange={(e) => setModifiedDetails({ ...modifiedDetails, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={modifiedDetails.email}
                readOnly={!isEditing}
                onChange={(e) => setModifiedDetails({ ...modifiedDetails, email: e.target.value })}
              />
            </div>
            {isEditing && (
              <div className="mt-2">
                <label className="block font-semibold">Profile Picture</label>
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  accept="image/*"
                  onChange={handlePictureChange}
                />
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <button
            onClick={handleSaveProfile}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Save Profile
          </button>
        ) : (
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Modify Profile
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Your Rides</h2>
        {userRides.length > 0 ? (
          userRides.map(ride => (
            <div key={ride._id} className="mb-4">
              <Card
                props={{
                  driver: ride.driver,
                  carmodel: ride.carmodel,
                  phone: ride.phone,
                  carPictures: ride.carPictures,
                  trajectory: ride.trajectory,
                  Desc: ride.Desc,
                }}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleModifyRide(ride._id)}
                  className="bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Modify
                </button>
                <button
                  onClick={() => handleDeleteRide(ride._id)}
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No rides found.</p>
        )}
      </div>
    </>
  );
}

export default Profile;
