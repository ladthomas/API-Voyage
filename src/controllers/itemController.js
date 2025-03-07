const connectDB = require('../config/db');



const itemController = {
    getItems: async (req, res) => {
        try {
            const db = await connectDB();
            const items = await db.all('SELECT * FROM items WHERE trip_id = ?', [req.params.tripId]);
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ error: 'Impossible de récupérer les items' });
        }
    },

    createItem: async (req, res) => {
        try {
            const db = await connectDB();
            const { name, quantity, status } = req.body;

            if (!name || !quantity) {
                return res.status(400).json({ error: 'Nom et quantité requis' });
            }

            await db.run(
                'INSERT INTO items (trip_id, name, quantity, status) VALUES (?, ?, ?, ?)',
                [req.params.tripId, name, quantity, status || 'pending']
            );
            res.status(201).json({ message: 'Item ajouté avec succès' });
        } catch (error) {
            res.status(400).json({ error: 'Erreur lors de l’ajout de l’item' });
        }
    },

    updateItem: async (req, res) => {
        try {
            const db = await connectDB();
            const { name, quantity, status } = req.body;

            if (!name || !quantity || !status) {
                return res.status(400).json({ error: 'Tous les champs sont requis' });
            }

            await db.run(
                'UPDATE items SET name = ?, quantity = ?, status = ? WHERE id = ? AND trip_id = ?',
                [name, quantity, status, req.params.itemId, req.params.tripId]
            );
            res.status(200).json({ message: 'Item mis à jour avec succès' });
        } catch (error) {
            res.status(400).json({ error: 'Erreur lors de la mise à jour de l’item' });
        }
    },

    deleteItem: async (req, res) => {
        try {
            const db = await connectDB();
            await db.run('DELETE FROM items WHERE id = ? AND trip_id = ?', [req.params.itemId, req.params.tripId]);
            res.status(200).json({ message: 'Item supprimé avec succès' });
        } catch (error) {
            res.status(400).json({ error: 'Erreur lors de la suppression de l’item' });
        }
    },

    markItemAsTaken: async (req, res) => {
        try {
            const db = await connectDB();
            await db.run('UPDATE items SET status = ? WHERE id = ? AND trip_id = ?', ['taken', req.params.itemId, req.params.tripId]);
            res.status(200).json({ message: 'Item marqué comme pris' });
        } catch (error) {
            res.status(400).json({ error: 'Erreur lors de la mise à jour du statut de l’item' });
        }
    }
};

module.exports = itemController;
