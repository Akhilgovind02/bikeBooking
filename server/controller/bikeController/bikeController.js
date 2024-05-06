const Bike = require('../../model/bike');

const getBikes = async (req, res) => {
  try {
    const availableBikes = await Bike.find({ available: true }).populate('luggageOptions');
    res.json(availableBikes);
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addBike = async (req, res) => {
  try {
    const { name, type, price, image } = req.body;
    const newBike = new Bike({ name, type, price, image });
    await newBike.save();
    res.json({ message: 'Bike added successfully' });
  } catch (error) {
    console.error('Error adding bike:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
   getBikes,
   addBike
  }