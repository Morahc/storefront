// import { OrderStore } from '../../models/orders';
// import { ProductStore } from '../../models/product';
// import { UserStore } from '../../models/user';

// const store = new OrderStore();
// const productStore = new ProductStore();
// const userStore = new UserStore();
// let product_id: number, user_id: number;

// describe('Order Model', () => {
//   beforeAll(async () => {
//     const product = await productStore.create({
//       name: 'Test product',
//       price: 1000,
//     });
//     product_id = product.id;
//     const user = await userStore.create({
//       email: 'test@domain.com',
//       firstname: 'John',
//       lastname: 'Doe',
//       password: 'password',
//     });
//     user_id = user.id as number;
//   });

//   afterAll(async () => {
//     await productStore.delete(product_id);
//     await userStore.delete(user_id)
//   });

//   it('should create an order', async () => {
//     const result = await store.create(1);
//     expect(result).toEqual({
//       id: 1,
//       user_id: user_id,
//       status: 'active',
//     });
//   });

//   it('should return a list of orders', async () => {
//     const result = await store.index(1);
//     expect(result).toEqual([
//       {
//         id: 1,
//         user_id: user_id,
//         status: 'active',
//       },
//     ]);
//   });

//   it('should return the correct order', async () => {
//     const result = await store.show('1', 1);
//     expect(result).toEqual({
//       id: 1,
//       product_id: product_id,
//       quantity: 10,
//       user_id: user_id,
//       status: 'new',
//     });
//   });

//   it('should update order status', async () => {
//     const result = await store.update({
//       id: 1,
//       user_id: user_id,
//       status: 'complete',
//     });
//     expect(result).toEqual({
//       id: 1,
//       user_id: user_id,
//       status: 'complete',
//     });
//   });

//   it('should delete the order', async () => {
//     await store.delete(1, user_id);
//     const result = await store.index(1);
//     expect(result).toEqual([]);
//   });
// });
