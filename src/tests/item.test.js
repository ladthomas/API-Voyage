const request = require('supertest');
const app = require('../app');

describe('Item API Tests', () => {
    let token, tripId, itemId;

    beforeAll(async () => {
        const loginRes = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });
        token = loginRes.body.token;
        
        const tripRes = await request(app)
            .post('/trips')
            .set('Authorization', `Bearer ${token}`)
            .send({ destination: 'Paris', start_date: '2024-06-01', end_date: '2024-06-10' });
        tripId = tripRes.body.id;
    });

    it('ajouter un élément à un voyage', async () => {
        const res = await request(app)
            .post(`/trips/${tripId}/items`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Passport', quantity: 1, status: 'pending' });
            expect(res.statusCode).toEqual(201);
            itemId = res.body.id;
      
    });

    it('ajouter un élément sans nom', async () => {
        const res = await request(app)
            .post(`/trips/${tripId}/items`)
            .set('Authorization', `Bearer ${token}`)
            .send({ quantity: 1, status: 'pending' });

    });

    it('mettre à jour un élément', async () => {
        const res = await request(app)
            .put(`/trips/${tripId}/items/${itemId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Laptop', quantity: 1, status: 'packed' });
       
    });

    it('supprimer un élément', async () => {
        const res = await request(app)
            .delete(`/trips/${tripId}/items/${itemId}`)
            .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
        
    });
});
