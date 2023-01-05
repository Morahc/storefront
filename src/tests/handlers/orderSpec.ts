import supertest from 'supertest';
import app from '../../server';
import { generateToken } from '../../utils';

const request = supertest(app);
const token: string = generateToken({ id: 1 });

describe('Order handlers: /orders', () => {
  it('should create order [POST]', () => {
    request
      .post('/orders/create')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(201)
      .expect({
        id: 1,
        user_id: 1,
        status: 'active',
      });
  });
  it('should return all orders of user [GET]', () => {
    request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect([
        {
          id: 1,
          user_id: 1,
          status: 'active',
        },
      ]);
  });

  it('should fail if token is not sent [GET]', () => {
    request
      .get('/orders')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({ error: 'Not authorized, no token' });
  });

  it('should show an order detail [GET]', () => {
    request
      .get('/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        id: 1,
        user_id: 1,
        status: 'active',
      });
  });

  it('should update order status [PUT]', () => {
    request
      .put('/orders/1')
      .send({ status: 'complete' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        id: 1,
        user_id: 1,
        status: 'complete',
      });
  });
  it('should delete order [DELETE]', () => {
    request
      .delete('/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect('Order deleted');
  });

  it('should add product to order [POST]', () => {
    request
      .post('/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        id: 1,
        quantity: 10,
        order_id: 1,
        product_id: 1,
      });
  });

  it('should show items in order [GET]', () => {
    request
      .delete('/orders/1/items')
      .expect(200)
      .expect([
        {
          id: 1,
          quantity: 10,
          order_id: 1,
          product_id: 1,
        },
      ]);
  });
});
