import express, { Request, Response } from 'express';
import { isAuthenticated } from '../middleware/auth';
import { OrderStore } from '../models/orders';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index(req.user?.id);
    res.json(orders);
  } catch (error) {
    res.json({ error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      throw 'Missing "id" parameter';
    }
    const order = await store.show(id, req.user?.id);

    if (!order) {
      res.status(404);
      throw 'could not find order';
    }
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const order = await store.create(id);
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;
    const id = req.params.id as unknown as number;
    const status = req.body.status;

    const order = await store.update({ id, user_id, status });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;
    const id = req.params.id as unknown as number;
    await store.delete(id, user_id);
    res.json('Order deleted');
  } catch (error) {
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const { product_id, quantity } = req.body;

    if (!id) {
      res.status(400);
      throw 'Missing "id" parameter';
    }

    if (!quantity || !product_id) {
      throw 'Missing required parameters';
    }
    const order = await store.addItem({ order_id: id, product_id, quantity });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

const showOrderItems = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      res.status(400);
      throw 'Missing "id" parameter';
    }

    const order = await store.showItems(id);
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

const order_routes = (app: express.Application) => {
  app.get('/orders', isAuthenticated, index);
  app.post('/orders', isAuthenticated, create);
  app.get('/orders/:id', isAuthenticated, show);
  app.delete('/orders/:id', isAuthenticated, destroy);
  app.put('/orders/:id', isAuthenticated, update);
  app.post('/orders/:id', isAuthenticated, addProduct);
  app.get('/orders/:id/items', isAuthenticated, showOrderItems);
};

export default order_routes;
