import { UserStore } from '../../models/user';

const store = new UserStore();
let id: number;
const user = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'test@domain.com',
  password: 'password',
};
const { firstname, lastname, email, password } = user;

describe('User Model', () => {
  it('should create user', async () => {
    const result = await store.create({
      firstname,
      lastname,
      email,
      password,
    });
    id = result.id;
    expect(result).toEqual({
      id,
      firstname,
      lastname,
      email,
    });
  });

  it('should return a single user', async () => {
    const result = await store.show(id);
    expect(result).toEqual({
      id,
      firstname,
      lastname,
      email,
    });
  });
});
