const connectDB = require('../config/db');

class Trip {
    static async create(user_id, destination, start_date, end_date) {
        const db = await connectDB();
        await db.run('INSERT INTO trips (user_id, destination, start_date, end_date) VALUES (?, ?, ?, ?)', [user_id, destination, start_date, end_date]);
    }
    
    static async findByUserId(user_id) {
        const db = await connectDB();
        return db.all('SELECT * FROM trips WHERE user_id = ?', [user_id]);
    }
}

module.exports = Trip;
