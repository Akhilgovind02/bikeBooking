const Bike = require('../../model/bike');
const LuggageOption = require('../../model/luggage');


const getBikes = async (req, res) => {
  try {
    const availableBikes = await Bike.find({ available: true }).populate('luggageOptions');
    res.json(availableBikes);
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getBikeById = async (req, res) => {
  try {
    const { bikeId } = req.params;
    const bike = await Bike.findById(bikeId).populate('luggageOptions');
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found' });
    }
    res.json(bike);
  } catch (error) {
    console.error('Error fetching bike by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addBike = async (req, res) => {
  try {
    const { name, type, price, image, luggageOptions } = req.body;

    console.log('Luggage options received:', luggageOptions);

    const newBike = new Bike({ name, type, price, image, luggageOptions });
    await newBike.save();
    res.json({ message: 'Bike added successfully' });
  } catch (error) {
    console.error('Error adding bike:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = {
   getBikes,
   addBike,
   getBikeById
  }