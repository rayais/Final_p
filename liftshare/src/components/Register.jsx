import React, { useState } from 'react';
import axios from 'axios';
import Nav from './header/Nav';
import { useNavigate } from 'react-router';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '+216',
    picture: null,
  });
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility
  const [registeredName, setRegisteredName] = useState('');  // State to store the registered name
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleFileChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     picture: e.target.files[0],
  //   });
  // };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Verify that the file is correctly selected
    setFormData({
      ...formData,
      picture: file,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    let pictureUrl = null;
    if (formData.picture) {
      const imageData = new FormData();
      imageData.append('file', formData.picture); 
      imageData.append('upload_preset', 'proimag');
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/drawpzs79/image/upload', imageData); // Replace with your Cloudinary cloud name
        pictureUrl = response.data.secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    const submitData = {
      ...formData,
      picture: pictureUrl,
    };

    axios.post('http://localhost:5410/user', submitData)
      .then(response => {
        console.log('User registered successfully:', response.data);
        setRegisteredName(formData.name);  // Set the registered name for the modal
        setShowModal(true);  // Show the modal
      })
      .catch(error => {
        console.error('Error registering user:', error.response.data.msg);
        alert(error.response.data.msg)
      });
  };

  const handleCancel = () => {
    setFormData({
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      phone: '+216',
      picture: null,
    });
    navigate('/')
  };

  const handleSocialLogin = (platform) => {
    alert(`Login with ${platform} not implemented yet.`);
  };

  return (
    <div>
      <Nav />
      <div className="flex items-center justify-center min-h-screen mt-12 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <div className="mb-4">
                <label className="block font-bold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Profile Picture</label>
                <input
                  type="file"
                  name="picture"
                  className="w-full p-2 border border-gray-300 rounded"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                  Register
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Registration Successful</h2>
            <p className="mb-4">Thank you, <strong>{registeredName}</strong>, for registering!</p>
            <p className="mb-4">You can now log in to your account.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
