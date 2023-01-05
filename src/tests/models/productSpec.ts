import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  it('should create a product', async () => {
    const result = await store.create({
      name: 'Test Product',
      price: 1000,
    });
    console.info('This is the product model test log');

    expect(result).toEqual({
      id: result.id,
      name: 'Test Product',
      price: 1000,
    });
  });

  it('should return a product', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: result.id,
      name: 'Test Product',
      price: 1000,
    });
  });

  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result.length).toEqual(1);
  });
});
