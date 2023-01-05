import { ProductStore } from '../../models/product';

const store = new ProductStore();
let id:number;

describe('Product Model', () => {
  it('should create a product', async () => {
    const result = await store.create({
      name: 'Test Product',
      price: 1000,
    });
    id = result.id;

    expect(result).toEqual({
      id: result.id,
      name: 'Test Product',
      price: 1000,
    });
  });

  it('should return a product', async () => {
    const result = await store.show(id);
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
