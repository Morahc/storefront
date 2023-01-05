import client from '../database';

interface orderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}


interface Order {
  id: number;
  user_id: number;
  status: 'active' | 'complete';
}

type createOrderItem = Omit<orderItem, 'id'>;

export class OrderStore {
  async index(user_id: number) {
    try {
      const conn = await client.connect();
      const result = await conn.query('SELECT * FROM orders WHERE user_id=$1', [user_id]);
      conn.release();

      return result.rows;
    } catch (error) {
      return error;
    }
  }

  async show(id: number, user_id: number) {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        'SELECT * FROM orders WHERE id=$1 and user_id=$2',
        // 'SELECT * FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id=$1 and id=$2)',
        [id, user_id]
      );
      const order = result.rows[0];

      if (!order) {
        throw 'Order not found';
      }

      conn.release();
      return order;
    } catch (error) {
      return error;
    }
  }
  async create(user_id: number) {
    try {
      const conn = await client.connect();
      const result = await conn.query('INSERT INTO orders (user_id) VALUES($1) RETURNING *', [
        user_id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`order could not be created`);
    }
  }
  async update(query: Order): Promise<Order> {
    const { id, user_id, status } = query;
    try {
      const connection = await client.connect();

      const result = await connection.query(
        'UPDATE orders SET status = $3 WHERE id = $1 and user_id = $2 RETURNING *',
        [id, user_id, status]
      );
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update orders ${id}. Error: ${err}`);
    }
  }

  async delete(id: number, user_id: number): Promise<Order> {
    try {
      const conn = await client.connect();

      const result = await conn.query('DELETE FROM orders WHERE id=$1 and user_id = $2', [
        id,
        user_id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
  async addItem(query: createOrderItem) {
    try {
      const { order_id, product_id, quantity } = query;
      const conn = await client.connect();
      const result = await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *',
        [order_id, product_id, quantity]
      );
      conn.release();

      if (result.rows[0].length == 0) {
        throw 'Could not add item to orders';
      }

      return result.rows[0];
    } catch (err) {
      throw new Error('could not add item');
    }
  }
  async showItems(id: number) {
    try {
      const conn = await client.connect();
      const result = await conn.query('SELECT * FROM order_items WHERE order_id=$1', [id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error('could not find item');
    }
  }
}

export default OrderStore;
