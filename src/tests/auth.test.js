const request = require('supertest');
const app = require('../app');

describe('Authentication API Tests', () => {
    it('enregistrer un nouvel utilisateur', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ email: 'test@example.com', password: 'password123' });
       
    });

    it('enregistrement devrait échouer sans le mail', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ password: 'password123' });
        expect(res.statusCode).toEqual(400);
    });

    it(' se connecter à un utilisateur', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });
        
        
    });

    it('la connexion en cas de mot de passe erroné', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });
        expect(res.statusCode).toEqual(401);
    });
});
