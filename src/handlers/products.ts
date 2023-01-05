import express, { Request, Response } from 'express';
import { isAuthenticated } from '../middleware/auth';
import { ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      res.status(400);
      throw 'Missing "id" parameter';
    }
    const product = await store.show(id);

    if (!product) {
      res.status(404);
      throw 'Product not found';
    }
    res.status(200).json(product);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    if (!price || !name) {
      res.status(400);
      throw 'All fields should be filled';
    }
    const product = await store.create({ price, name });

    if (!product) {
      res.status(404);
      throw 'Product could not be created';
    }
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (!id) {
      res.status(400);
      throw 'Missing "id" parameter';
    }
    await store.delete(id);

    res.status(200).json('Product deleted');
  } catch (error) {
    res.json(error);
  }
};

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', isAuthenticated, create);
  app.delete('/products/:id', isAuthenticated, destroy);
};

export default product_routes;
