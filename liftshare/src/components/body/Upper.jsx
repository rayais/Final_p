import React from 'react';
import image from '../../assets/Carpooling.jpg';
import { Link } from 'react-router-dom';

function Upper() {
  const style = {
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5))',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)',
    width:'100%',
    marginTop:'50'
  };

  return (
    <section className="hero-section bg-cover bg-center h-screen mt-10" style={{ backgroundImage: `url(${image})` }}>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-center h-full text-gray-800">
          <div className="lg:w-1/2 xl:w-1/3">
            <div style={style} >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">ShareLift</h1>
              <p className="text-lg text-white lg:text-xl xl:text-2xl mb-8">
              "Share the Ride, Share the Cost, Share the Future."<br /><br />
              "Join the Carpool Revolution - Save Money, Time, and the Planet."
              </p>
                <Link to='/register'>
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
                </Link>
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-2/3">
            <img
              src="https://images.unsplash.com/photo-1616763355601-5a1d923d765c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Upper;