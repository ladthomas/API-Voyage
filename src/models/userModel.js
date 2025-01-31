const connectDB = require('../config/db');

class User {
    static async create(email, password) {
        const db = await connectDB();
        await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    }
    
    static async findByEmail(email) {
        const db = await connectDB();
        return db.get('SELECT * FROM users WHERE email = ?', [email]);
    }
}

module.exports = User;
