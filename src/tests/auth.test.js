const request = require('supertest');
const app = require('../app');

describe('Authentication API Tests', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(res.statusCode).toEqual(201);
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});