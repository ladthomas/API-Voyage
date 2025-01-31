const Trip = require('../models/tripModel');

exports.getTrips = async (req, res) => {
    const trips = await Trip.findByUserId(req.user.id);
    res.json(trips);
};

exports.createTrip = async (req, res) => {
    try {
        await Trip.create(req.user.id, req.body.destination, req.body.start_date, req.body.end_date);
        res.status(201).json({ message: 'Trip created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
