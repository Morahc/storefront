import client from '../database';
import { comparePassword } from '../utils';

interface user {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
interface loginUser {
  email: string;
  password: string;
}

type createUser = Omit<user, 'id'> & { password: string };

export class UserStore {
  async create(query: createUser): Promise<user> {
    const { firstname, lastname, email, password } = query;
    try {
      const conn = await client.connect();
      const result = await conn.query(
        'INSERT INTO users (firstname, lastname, password, email) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname, email',
        [firstname, lastname, password, email]
      );

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`User could not be created -${err}`);
    }
  }
  async auth(query: loginUser): Promise<user> {
    const { email, password } = query;
    try {
      console.log(email, password);
      const conn = await client.connect();
      const result = await conn.query('SELECT * FROM users WHERE email=$1', [email]);
      if (!result.rows[0]) {
        throw `user with email ${email} not found`;
      }
      const match = await comparePassword(password, result.rows[0].password);
      console.log(match);
      if (!match) {
        throw 'Incorrect password';
      }

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw `Could not login - ${err}`;
    }
  }
  async show(id: number): Promise<user> {
    try {
      const conn = await client.connect();
      const result = await conn.query('SELECT id, firstname, lastname, email FROM users WHERE id=$1', [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw `Could not find user - ${err}`;
    }
  }
  async delete(id: number): Promise<user> {
    try {
      const conn = await client.connect();
      const result = await conn.query('DELETE FROM users WHERE id=$1', [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw `Could not find user - ${err}`;
    }
  }
}

export default UserStore;
