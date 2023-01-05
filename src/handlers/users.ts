import express, { Request, Response } from 'express';
import { isAuthenticated } from '../middleware/auth';
import { UserStore } from '../models/user';
import { generateToken, hashPassword } from '../utils';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !password || !email) {
      res.status(400);
      throw 'All fields should be filled';
    }
    const user = await store.create({
      firstname,
      lastname,
      email,
      password: await hashPassword(password),
    });

    if (!user) {
      res.status(400);
      throw 'User could not be created';
    }
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const auth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      res.status(400);
      throw 'All fields should be filled';
    }
    const user = await store.auth({ email, password });

    if (!user) {
      res.status(404);
      throw 'User not found';
    }
    const { id } = user;
    const token = generateToken({ id });

    res.json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id= req.user?.id;

    if (!id) {
      res.status(400)
      throw ('Missing "id" parameter');
    }
    const user = await store.show(id);

    if (!user) {
      res.status(404);
      throw 'User not found';
    }

    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const id= req.user?.id;

    if (!id) {
      res.status(400)
      throw ('Missing "id" parameter');
    }
    await store.delete(id);

    res.json('User deleted');
  } catch (error) {
    res.status(400).json(error);
  }
};

const user_routes = (app: express.Application) => {
  app.post('/user/create', create);
  app.post('/user/auth', auth);
  app.get('/user', isAuthenticated, show);
  app.delete('/user', isAuthenticated, destroy);
};

export default user_routes;
