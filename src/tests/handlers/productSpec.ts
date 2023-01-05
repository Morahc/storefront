import supertest from 'supertest';
import app from '../../server';
import { generateToken } from '../../utils';

const request = supertest(app);
const token: string = generateToken({ id: 1 });

describe('Product handlers: /products', () => {
  it('should create a new product', () => {
    const data = {
      name: 'Test',
      price: 40,
    };
    request
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(201)
      .expect({
        id: 1,
        name: 'Test',
        price: '$4000',
      });
  });

  it('should fail if any parameter is missing', () => {
    const data = {
      name: 'Test',
    };
    request
      .post('/products/create')
      .set('authorization', `Bearer ${token}`)
      .send(data)
      .expect(400)
      .expect('All fields should be filled');
  });

  it('should show all products', () => {
    request
      .get('/products')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Test',
          price: 400,
        },
      ]);
  });

  it('should return product with id', () => {
    request.get('/products/1').expect('Content-Type', 'application/json').expect(200).expect({
      id: 1,
      name: 'Test',
      price: 400,
    });
  });

  it('should delete product with id', () => {
    request
      .delete('/products/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(() => {
        request.get('/products').expect([]);
      });
  });
});
