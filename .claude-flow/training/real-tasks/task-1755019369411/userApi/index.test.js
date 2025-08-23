
const request = require('supertest');
const app = require('./index');

describe('User API', () => {
  test('GET /users returns empty array initially', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  
  test('POST /users creates a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@test.com' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test');
  });
});
