const request = require('supertest');
const expressApp = require('./app');

describe('Test the root path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(expressApp).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the /users path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(expressApp).get('/users');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the /catalog path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(expressApp).get('/catalog');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test a nonexistent route', () => {
  test('It should respond with a 404 status code', async () => {
    const response = await request(expressApp).get('/nonexistent-route');
    expect(response.statusCode).toBe(404);
  });
});

afterAll(() => {
  expressApp.closeMongooseConnection();
});
