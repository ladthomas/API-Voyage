const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');
const connectDB = require('../config/db');

const authController = {
    register: async (req, res) => {
        try {
            const db = await connectDB();
            const { email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);
            await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const db = await connectDB();
            const { email, password } = req.body;

            const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            if (!SECRET_KEY) {
                return res.status(500).json({ error: 'SECRET_KEY is missing' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};


module.exports = authController;
