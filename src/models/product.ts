import client from '../database';

export interface product {
  name: string;
  price: number;
  id: number;
}

type createProduct = Omit<product, 'id'>;

export class ProductStore {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const result = await conn.query('SELECT * FROM products ORDER BY id ASC');
      conn.release();
      
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. ${err}`)
    }
  }

  async show(id: number): Promise<product> {
    try {
      const conn = await client.connect();
      const result = await conn.query('SELECT * FROM products WHERE id=$1', [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err}`)
    }
  }
  async delete(id: number): Promise<product> {
    try {
      const conn = await client.connect();
      const result = await conn.query('DELETE FROM products WHERE id=$1', [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw (`Cannot delete product with id - ${id}`);
    }
  }

  async create(query: createProduct): Promise<product> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *',
        [query.name, query.price]
      );
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw (`Could not create products -${err}`);
    }
  }
}
