
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const itemRoutes = require('./routes/itemRoutes');
const connectDB = require('./config/db');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Logging des requêtes
const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'app.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// Connexion à la base de données
(async () => {
    await connectDB();
})();

// Routes API
app.use('/auth', authRoutes);
app.use('/trips', tripRoutes);
app.use('/items', itemRoutes);

// Middleware de gestion des erreurs
app.use(errorMiddleware);

module.exports = app;
