# WebBanHang API Endpoints

## Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user information (requires authentication)

## Products

- `GET /api/products` - Get all products with search and filter options
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product (requires admin)
- `PUT /api/products/:id` - Update an existing product (requires admin)
- `DELETE /api/products/:id` - Delete a product (requires admin)

## Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a single category by ID
- `POST /api/categories` - Create a new category (requires admin)
- `PUT /api/categories/:id` - Update an existing category (requires admin)
- `DELETE /api/categories/:id` - Delete a category (requires admin)

## Cart

- `GET /api/cart` - Get user's cart (requires authentication)
- `POST /api/cart/add` - Add product to cart (requires authentication)
- `PUT /api/cart/update` - Update product quantity in cart (requires authentication)
- `DELETE /api/cart/remove/:productId` - Remove product from cart (requires authentication)

## Orders

- `POST /api/orders` - Create a new order (requires authentication)
- `GET /api/orders` - Get all orders for the current user (requires authentication)
- `GET /api/orders/:id` - Get a single order by ID (requires authentication)
- `GET /api/orders/all` - Get all orders (requires admin)
- `PUT /api/orders/:id/payment` - Update payment status (requires admin)

## Reviews

- `POST /api/reviews` - Create a review for a product (requires authentication)
- `GET /api/reviews/product/:productId` - Get all reviews for a product

## Other

- `GET /api` - Welcome message / API info
