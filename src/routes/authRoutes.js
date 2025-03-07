const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 

// Vérifier que authController contient bien les fonctions
//console.log('Auth Controller:', authController);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
