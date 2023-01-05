// import { UserStore } from '../../models/user';

// const store = new UserStore();

// describe('User Model', () => {
//   it('should create user', async () => {
//     const result = await store.create({
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'test@domain.com',
//       password: 'password',
//     });
//     expect(result).toEqual({
//       id: 1,
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'test@domain.com',
//     });
//   });

//   it('should not authenicate user (valid parameters)', async () => {
//     const result = await store.auth({
//       email: 'test@domain.com',
//       password: 'password',
//     });
//     expect(result).toEqual({
//       id: 1,
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'test@domain.com',
//     });
//   });

//   it('should authenicate user (invalid parameters)', async () => {
//     const result = await store.auth({
//       email: 'test@domain.com',
//       password: 'passwo',
//     });
//     expect(result).toThrowError('Incorrect password');
//   });

//   it('should return a single user', async () => {
//     const result = await store.show(1);
//     expect(result).toEqual({
//       id: 1,
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'test@domain.com',
//     });
//   });
// });
