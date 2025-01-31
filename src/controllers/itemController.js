const connectDB = require('../config/db');

const itemController = {
    //  Lister les items d'un voyage
    getItems: async (req, res) => {
        try {
            const db = await connectDB();
            const items = await db.all('SELECT * FROM items WHERE trip_id = ?', [req.params.tripId]);
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //  Ajouter un item
    createItem: async (req, res) => {
        try {
            const db = await connectDB();
            const { name, quantity, status } = req.body;
            await db.run(
                'INSERT INTO items (trip_id, name, quantity, status) VALUES (?, ?, ?, ?)',
                [req.params.tripId, name, quantity, status || 'pending']
            );
            res.status(201).json({ message: 'Item added' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //  Modifier un item
    updateItem: async (req, res) => {
        try {
            const db = await connectDB();
            const { name, quantity, status } = req.body;
            await db.run(
                'UPDATE items SET name = ?, quantity = ?, status = ? WHERE id = ? AND trip_id = ?',
                [name, quantity, status, req.params.itemId, req.params.tripId]
            );
            res.json({ message: 'Item updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //  Supprimer un item
    deleteItem: async (req, res) => {
        try {
            const db = await connectDB();
            await db.run('DELETE FROM items WHERE id = ? AND trip_id = ?', [req.params.itemId, req.params.tripId]);
            res.json({ message: 'Item deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //  Marquer un item comme "pris"
    markItemAsTaken: async (req, res) => {
        try {
            const db = await connectDB();
            await db.run('UPDATE items SET status = ? WHERE id = ? AND trip_id = ?', ['taken', req.params.itemId, req.params.tripId]);
            res.json({ message: 'Item marked as taken' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = itemController;
