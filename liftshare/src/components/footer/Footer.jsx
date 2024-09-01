import React, { useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import img from '../../assets/smartit.png';
import axios from 'axios';

const Footer = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(message)
    try {
      await axios.post('http://localhost:5410/savemessage', { message });
      alert('Message saved successfully!');
      setMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error saving message:', error);
      alert('Failed to save message. Please try again later.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className=" w-full px-4">
        <div className="flex flex-wrap justify-around items-center">
          {/* First Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 flex items-center">
            <img 
              src={img}
              alt="Logo"
              className="mb-4 w-40"
            />
            <p>We try to find IT solutions that simplify your daily tasks and enhance your productivity.</p>
          </div>

          {/* Second Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 pl-8">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="please provide your contact"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white placeholder-gray-400"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Send
              </button>
            </form>
          </div>

          {/* Third Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0  flex-col pl-8  ">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                <FaFacebook size={30} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500">
                <FaInstagram size={30} />
              </a>
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-lg">+216 12345678</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
