# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

- Index : `/products [GET]`
- Show : `/products/:id [GET]`
- Create : `/products [POST]` [token required]
- Delete : `/products/:id [DELETE]` [token required]

### Users

- Delete : `/user [DELETE]` [token required]
- Show : `/user [GET]` [token required]
- Auth : `/user/auth [POST]`
- Create : `/user/create [POST]`

### Orders

- Index : `/orders [GET]` [token required]
- Create : `/orders [GET]` [token required]
- Show : `/orders/:id [GET]` [token required]
- Delete : `/orders/:id [DELETE]` [token required]
- Update : `/orders/:id [PUT]` [token required]
- Add product : `/orders/:id [POST]` [token required]
- Get order items : `/orders/:id/items [GET]` [token required]

## Data Shapes

### Product

- id
- name
- price

### User

- id
- firstName
- lastName
- email
- password

### Order

- id
- user_id
- status (active or complete)
-

### Order Items

- id
- quantity
- order_id
- quantity
