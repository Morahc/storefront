import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import product_routes from './handlers/products';

const app: express.Application = express();
const address = '0.0.0.0:3000';

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

product_routes(app);
user_routes(app);
order_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
