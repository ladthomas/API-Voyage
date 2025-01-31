const request = require('supertest');
const app = require('../app');

describe('Item API Tests', () => {
    let token, tripId;

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

    it('should add an item to a trip', async () => {
        const res = await request(app)
            .post(`/trips/${tripId}/items`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Passport', quantity: 1, status: 'pending' });
        expect(res.statusCode).toEqual(201);
    });
});
