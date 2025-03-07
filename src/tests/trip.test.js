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

it('créer un nouveau voyage', async () => {
        const res = await request(app)
            .post('/trips')
            .set('Authorization', `Bearer ${token}`)
            .send({ destination: 'Paris', start_date: '2024-06-01', end_date: '2024-06-10' });
            expect(res.statusCode).toEqual(201);
       
    });

    it('créer de voyage sans token', async () => {
        const res = await request(app)
            .post('/trips')
            .send({ destination: 'Paris', start_date: '2024-06-01', end_date: '2024-06-10' });
        expect(res.statusCode).toEqual(401);
    });

    it('un voyage sans destination', async () => {
        const res = await request(app)
            .post('/trips')
            .set('Authorization', `Bearer ${token}`)
            .send({ start_date: '2024-06-01', end_date: '2024-06-10' });
        
    });

    it('récupérer tous les voyages', async () => {
        const res = await request(app)
            .get('/trips')
            .set('Authorization', `Bearer ${token}`);
       
    });
});
