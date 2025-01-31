const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/:tripId', authMiddleware, itemController.getItems); 
router.post('/:tripId', authMiddleware, itemController.createItem); 
router.put('/:tripId/:itemId', authMiddleware, itemController.updateItem); 
router.delete('/:tripId/:itemId', authMiddleware, itemController.deleteItem); 
router.patch('/:tripId/:itemId', authMiddleware, itemController.markItemAsTaken); 

module.exports = router;
