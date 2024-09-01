import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';


function List() {
  const [rides, setRides] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5410/ride')
      .then(response => {
        setRides(response.data);

        
      })
      .catch(error => {
        console.error('Error fetching rides:', error);
      });
  }, []);
  return (
    <div className='flex-row justify-center items-center'>
        {(
  rides.slice(0, 5).map((ride, index) => (
    <div key={index}>
      {console.log(ride)}
      <Card props={ride} />
    </div>
  ))
)}
        
    </div>
  )
}

export default List