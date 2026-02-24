const request = require('supertest');
const app = require('../src/app');

describe('Menu API', () => {
    describe('GET /api/menu', () => {
        it ('should return all menu items', async () => {
            const response = await request(app)
                .get('/api/menu')
                .expect(200);
            
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('price');
        });
    });

    describe('GET /api/menu/:id', () => {
    it('should return a specific menu item', async () => {
      const response = await request(app)
            .get('/api/menu/1')
            .expect(200);
        
            expect(response.body).toHaveProperty('id', 1);
            expect(response.body).toHaveProperty('name');
        });

        it('should return 404 for non-existent item', async () => {
        await request(app)
            .get('/api/menu/999')
            .expect(404);
        });
    });
})