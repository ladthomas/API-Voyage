const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');
const connectDB = require('../config/db');

const authController = {
    register: async (req, res) => {
        try {
            const db = await connectDB();
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email et mot de passe requis' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

            res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
        } catch (error) {
            res.status(400).json({ error: 'Erreur lors de l’inscription' });
        }
    },

    login: async (req, res) => {
        try {
            const db = await connectDB();
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email et mot de passe requis' });
            }

            const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Identifiants incorrects' });
            }

            if (!SECRET_KEY) {
                return res.status(500).json({ error: 'SECRET_KEY manquant' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error: 'Erreur lors de la connexion' });
        }
    }
};

module.exports = authController;