const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, tripController.getTrips);
router.post('/', authMiddleware, tripController.createTrip);

module.exports = router;
