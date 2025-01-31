const connectDB = require('../config/db');

class Item {
    static async create(trip_id, name, quantity, status) {
        const db = await connectDB();
        await db.run('INSERT INTO items (trip_id, name, quantity, status) VALUES (?, ?, ?, ?)', [trip_id, name, quantity, status]);
    }
    
    static async findByTripId(trip_id) {
        const db = await connectDB();
        return db.all('SELECT * FROM items WHERE trip_id = ?', [trip_id]);
    }
    
    static async update(item_id, name, quantity, status) {
        const db = await connectDB();
        await db.run('UPDATE items SET name = ?, quantity = ?, status = ? WHERE id = ?', [name, quantity, status, item_id]);
    }
    
    static async delete(item_id) {
        const db = await connectDB();
        await db.run('DELETE FROM items WHERE id = ?', [item_id]);
    }
}

module.exports = Item;
