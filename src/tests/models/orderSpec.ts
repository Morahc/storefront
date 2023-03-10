import { OrderStore } from '../../models/orders';
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';

const store = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();
let product_id: number, user_id: number, id: number;

describe('Order Model', () => {
  beforeAll(async () => {
    const product = await productStore.create({
      name: 'Test product',
      price: 1000,
    });
    product_id = product.id;
    const user = await userStore.create({
      email: 'test@domain.com',
      firstname: 'John',
      lastname: 'Doe',
      password: 'password',
    });
    user_id = user.id as number;
  });

  afterAll(async () => {
    await productStore.delete(product_id);
    await userStore.delete(user_id);
  });

  it('should create an order', async () => {
    const result = await store.create(1);
    id = result.id;
    expect(result).toEqual({
      id: result.id,
      user_id: user_id,
      status: 'active',
    });
  });

  it('should return a list of orders', async () => {
    const result = await store.index(id);
    expect(result).toEqual([
      {
        id,
        user_id: user_id,
        status: 'active',
      },
    ]);
  });

  it('should return the correct order', async () => {
    const result = await store.show(id, user_id);
    expect(result).toEqual({
      id,
      user_id: user_id,
      status: 'active',
    });
  });

  it('should update order status', async () => {
    const result = await store.update({
      id,
      user_id,
      status: 'complete',
    });
    expect(result).toEqual({
      id,
      user_id,
      status: 'complete',
    });
  });

  it('should delete the order', async () => {
    await store.delete(id, user_id);
    const result = await store.index(1);
    expect(result).toEqual([]);
  });
});
