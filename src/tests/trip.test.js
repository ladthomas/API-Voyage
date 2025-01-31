const request = require('supertest');
const app = require('../app');

describe('Trip API Tests', () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });
        token = res.body.token;
    });

    it('should create a new trip', async () => {
        const res = await request(app)
            .post('/trips')
            .set('Authorization', `Bearer ${token}`)
            .send({ destination: 'Paris', start_date: '2024-06-01', end_date: '2024-06-10' });
        expect(res.statusCode).toEqual(201);
    });
});