const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let dbInstance;

async function connectDB() {
    if (!dbInstance) {
        dbInstance = await open({
            filename: './packing_list.db',
            driver: sqlite3.Database
        });

        // Création des tables si elles n'existent pas
        await dbInstance.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS trips (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                destination TEXT NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                trip_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                status TEXT DEFAULT 'pending',
                FOREIGN KEY (trip_id) REFERENCES trips(id)
            );
        `);
    }
    return dbInstance;
}

module.exports = connectDB;
