import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import logo from '../../assets/logolift.png';

function Nav() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogin = () => {
    setOpen(!open);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      // Replace this with your actual login API endpoint
      console.log(email,password)
      const response = await axios.post('http://localhost:5410/login ', { email, password });

      if (response.status === 200) {
        const fetchedToken = response.data.token;

        // Store the token in local storage and update state
        localStorage.setItem('token', fetchedToken);
        setToken(fetchedToken);
        setOpen(false);
        navigate('/'); // Navigate to the homepage after login
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  const handlelogout=()=>{
    localStorage.clear();
    navigate('/')
  }
  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-6 bg-gray-100 border-b-4 border-b-slate-900">
        <Link to='/'>
          <img className="w-40" src={logo} alt="logo" />
        </Link>
        <div className="hidden md:flex gap-4">
          <Link to='/'><li className="border-b-2">HOME</li></Link>
          <Link to='/list'>
            <li className="border-b-2">RIDES</li>
          </Link>
          <li className="border-b-2">ABOUT</li>
        </div>
        <div className="hidden md:flex gap-4">
          {token ? (
            <div>
              <button onClick={handlelogout} className="bg-color2 hover:bg-blue-700 text-color5 shadow-md font-bold py-2 px-4 rounded">log out</button>
            <Link to='/Profile'>
              <button className="bg-color2 hover:bg-blue-700 text-color5 ml-4 shadow-md font-bold py-2 px-4 rounded">Profile</button>
            </Link>
            </div>
          ) : (
            <>
              <button onClick={handleLogin} className="bg-color2 hover:bg-blue-700 text-color5 shadow-md font-bold py-2 px-4 rounded">Login</button>
              <Link to='/register'>
                <button className="bg-color2 hover:bg-blue-700 text-color5 shadow-md font-bold py-2 px-4 rounded mt-2 w-full">Sign Up</button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={handleMenuToggle}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-gray-100 py-4 px-6 border-b-4 border-b-slate-900">
          <Link to='/' onClick={handleMenuToggle}><li className="border-b-2 py-2">HOME</li></Link>
          <Link to='/list'>
            <li className="border-b-2 py-2" onClick={handleMenuToggle}>RIDES</li>
          </Link>
          <li className="border-b-2 py-2" onClick={handleMenuToggle}>ABOUT</li>
          {token ? (
            <div>
              <button onClick={handlelogout} className="bg-color2 hover:bg-blue-700 text-color5 shadow-md font-bold py-2 px-4 rounded mt-2 w-full">log out</button>
            <Link to='/Profile'>
              <button className="bg-color2 hover:bg-blue-700 text-color5 shadow-md font-bold py-2 px-4 rounded mt-2 w-full">Profile</button>
            </Link>
            </div>
          ) : (
            <>
              <button onClick={handleLogin} className="bg-color2 hover:bg-blue-700 text-color5 shadow-md font-bold py-2 px-4 rounded mt-2 w-full">Login</button>
              <Link to='/register'>
                <button className="bg-color2 hover:bg-blue-700 text-color5 shadow-md font-bold py-2 px-4 rounded mt-2 w-full">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      )}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div onClick={handleLogin} className="fixed inset-0 bg-gray-800 bg-opacity-75"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-md w-full">
            <form onSubmit={handleSubmit}>
              <div className="text-center text-2xl font-bold mb-4">Login</div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">Email:</label>
                <input type="email" name="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Email" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">Password:</label>
                <input type="password" name="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Password" required />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Remember me</span>
                </label>
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">Login</button>
                <button onClick={handleLogin} type="button" className="bg-gray-500 text-white font-bold py-2 px-4 rounded">Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
