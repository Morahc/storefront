import supertest from 'supertest';
import app from '../../server';
import { generateToken } from '../../utils';

const request = supertest(app);
const token: string = generateToken({ id: 1 });

describe('Users handlers: /user', () => {
  it('should create a user [POST]', () => {
    const data = {
      email: 'john@domain.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'test1234',
    };
    request
      .post('/user/create')
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(201)
      .expect({
        id: 1,
        email: 'john@domain.com',
        first_name: 'John',
        last_name: 'Doe',
      });
  });

  it('should fail if any parameters are not sent [POST]', () => {
    const data = {
      first_name: 'John',
      last_name: 'Doe',
      password: 'test1234',
    };
    request
      .post('/user/create')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(400)
      .expect('All fields should be filled');
  });

  it('should authenication  user [POST]', () => {
    const data = {
      email: 'john@domain.com',
      password: 'test1234',
    };
    request
      .post('/user/auth')
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        token,
      });
  });

  it('should show user info [GET]', () => {
    request
      .get('/user/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        id: 1,
        first_name: 'Sally',
        last_name: 'Smothers',
        password_digest: 'test1234',
      });
  });

  it('should delete a user [DELETE]', () => {
    request.delete('/user/1').expect(200).expect('User deleted');
  });
});
