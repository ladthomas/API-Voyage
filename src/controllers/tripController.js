const Trip = require('../models/tripModel');



exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.findByUserId(req.user.id);
        res.status(200).json(trips);
    } catch (error) {
        res.status(400).json({ error: 'Impossible de récupérer les voyages' });
    }
};

exports.createTrip = async (req, res) => {
    try {
        const { destination, start_date, end_date } = req.body;
        if (!destination || !start_date || !end_date) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        await Trip.create(req.user.id, destination, start_date, end_date);
        res.status(201).json({ message: 'Voyage créé avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du voyage' });
    }
};
