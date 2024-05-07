import React, { useState, useEffect } from 'react';
import usersService from '../../services/users';
import '../Customer/Customer.css';
import BikeList from './BikeList';

function Customer() {
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(false);


  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await usersService.bikeList();
      setBikes(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch bikes:', error.message);
      setLoading(false);
      setError(true)
    }
  };

  const handleBookClick = (bikeId) => {
    // Handle booking logic here
    console.log(`Booking bike with ID: ${bikeId}`);
  };
  console.log(bikes)
  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Bikes</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          bikes.map(bike => (
            <BikeList
              key={bike._id}
              name={bike.name}
              availablility={bike.available}
              price={bike.price}
              image={bike.image}
              bikeId={bike._id}
              type = {bike.type}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Customer;
