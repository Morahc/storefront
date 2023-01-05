CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(70) NOT NULL,
  lastname VARCHAR(70) NOT NULL,
  email VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL
); 

CREATE TABLE products (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL, 
  price integer NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY, 
  user_id INT REFERENCES users(id), 
  status VARCHAR(25) DEFAULT('active')
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY, 
  order_id INT REFERENCES orders(id), 
  product_id INT REFERENCES products(id), 
  quantity INT NOT NULL
);