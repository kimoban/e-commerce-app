# E-Commerce Backend API Documentation

## Complete CRUD Endpoints

All endpoints requiring authentication should include the JWT token in the Authorization header:

```doc
Authorization: Bearer <your-jwt-token>
```

---

## Categories

### List Categories

```http
GET /api/categories/
```

- **Auth:** Optional
- **Returns:** List of all categories with product counts

### Create Category

```http
POST /api/categories/
```

- **Auth:** Required
- **Body:**

```json
{
  "name": "Electronics",
  "description": "Electronic items",
  "image": "https://example.com/image.jpg"
}
```

### Get Category

```http
GET /api/categories/{id}/
```

- **Auth:** Optional

### Update Category

```http
PATCH /api/categories/{id}/
```

- **Auth:** Required
- **Body:** Any category fields to update

### Delete Category

```http
DELETE /api/categories/{id}/
```

- **Auth:** Required

---

## Products

### List Products

```http
GET /api/products/?page=1&limit=12&category=1&q=search&sort=price
```

- **Auth:** Optional
- **Query Params:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 12)
  - `category`: Filter by category ID or name
  - `q`: Search query
  - `sort`: Sort field (price, -price, rating, -rating)

### Create Product

```http
POST /api/products/
```

- **Auth:** Required
- **Body:**

```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category_id": 1,
  "brand": "TechBrand",
  "stock": 50,
  "image": "https://example.com/laptop.jpg"
}
```

### Get Product

```http
GET /api/products/{id}/
```

- **Auth:** Optional

### Update Product

```http
PATCH /api/products/{id}/
```

- **Auth:** Required
- **Body:** Any product fields to update

### Delete Product

```http
DELETE /api/products/{id}/
```

- **Auth:** Required

### Get Product Reviews

```http
GET /api/products/{id}/reviews/
```

- **Auth:** Optional
- **Returns:** All reviews for the product

---

## Addresses

### List User Addresses

```http
GET /api/addresses/
```

- **Auth:** Required
- **Returns:** Current user's addresses

### Create Address

```http
POST /api/addresses/
```

- **Auth:** Required
- **Body:**

```json
{
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "postal_code": "10001",
  "is_default": true
}
```

### Get Address

```http
GET /api/addresses/{id}/
```

- **Auth:** Required

### Update Address

```http
PATCH /api/addresses/{id}/
```

- **Auth:** Required
- **Body:** Any address fields to update

### Delete Address

```http
DELETE /api/addresses/{id}/
```

- **Auth:** Required

### Set Default Address

```http
POST /api/addresses/{id}/set_default/
```

- **Auth:** Required
- **Effect:** Sets this address as default, removes default from others

---

## Cart

### Get Cart

```http
GET /api/cart/me/
```

- **Auth:** Required
- **Returns:** User's cart with all items and total

### Clear Cart

```http
DELETE /api/cart/clear/
```

- **Auth:** Required
- **Effect:** Removes all items from cart

---

## Cart Items

### List Cart Items

```http
GET /api/cart-items/
```

- **Auth:** Required
- **Returns:** All items in user's cart

### Add Item to Cart

```http
POST /api/cart-items/
```

- **Auth:** Required
- **Body:**

```json
{
  "product_id": 1,
  "quantity": 2
}
```

- **Note:** If item already exists, quantity is added to existing

### Update Cart Item

```http
PATCH /api/cart-items/{id}/
```

- **Auth:** Required
- **Body:**

```json
{
  "quantity": 5
}
```

### Delete Cart Item

```http
DELETE /api/cart-items/{id}/
```

- **Auth:** Required

---

## Orders

### List User Orders

```http
GET /api/orders/
```

- **Auth:** Required
- **Returns:** Current user's order history

### Create Order from Cart

```http
POST /api/orders/
```

- **Auth:** Required
- **Body (optional):**

```json
{
  "address_id": 1
}
```

- **Effect:**
  - Creates order from current cart items
  - Reduces product stock
  - Clears cart
  - Returns order with items

### Get Order

```http
GET /api/orders/{id}/
```

- **Auth:** Required
- **Returns:** Order details with items

### Update Order Status

```http
PATCH /api/orders/{id}/update_status/
```

- **Auth:** Required
- **Body:**

```json
{
  "status": "shipped"
}
```

- **Valid statuses:** pending, processing, shipped, delivered, cancelled

### Cancel Order

```http
POST /api/orders/{id}/cancel/
```

- **Auth:** Required
- **Effect:**
  - Changes status to cancelled
  - Restores product stock
- **Note:** Cannot cancel delivered or already cancelled orders

---

## Reviews

### List Reviews

```http
GET /api/reviews/?product={product_id}
```

- **Auth:** Optional
- **Query Params:**
  - `product`: Filter by product ID

### Create Review

```http
POST /api/reviews/
```

- **Auth:** Required
- **Body:**

```json
{
  "product": 1,
  "rating": 5,
  "comment": "Excellent product!"
}
```

- **Validation:**
  - Rating must be 1-5
  - One review per user per product
- **Effect:** Updates product rating and review count

### Update Review

```http
PATCH /api/reviews/{id}/
```

- **Auth:** Required
- **Body:** Any review fields to update
- **Note:** Can only update own reviews
- **Effect:** Recalculates product rating

### Delete Review

```http
DELETE /api/reviews/{id}/
```

- **Auth:** Required
- **Note:** Can only delete own reviews
- **Effect:** Recalculates product rating

---

## Response Formats

### Success Response (List)

```json
{
  "items": [...],
  "total": 100
}
```

### Success Response (Single)

```json
{
  "id": 1,
  "name": "Product Name",
  ...
}
```

### Error Response

```json
{
  "error": "Error message"
}
```

### Validation Error Response

```json
{
  "field_name": ["Error message"]
}
```

---

## Common Status Codes

- `200 OK` - Successful GET, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Authentication

All authenticated endpoints require a JWT token obtained from:

```http
POST /api/auth/login/
POST /api/auth/register/
POST /api/auth/google/exchange/
POST /api/auth/facebook/exchange/
```

Include the token in all requests:

```doc
Authorization: Bearer <token>
```

---

## Testing with cURL

### Get Products

```bash
curl -X GET "http://localhost:8000/api/products/?page=1&limit=10"
```

### Create Product (Authenticated)

```bash
curl -X POST "http://localhost:8000/api/products/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category_id": 1,
    "stock": 10
  }'
```

### Add to Cart

```bash
curl -X POST "http://localhost:8000/api/cart-items/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 2
  }'
```

### Create Order

```bash
curl -X POST "http://localhost:8000/api/orders/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "address_id": 1
  }'
```

---

## Pagination

List endpoints return paginated results:

```json
{
  "items": [...],
  "total": 100
}
```

Use `page` and `limit` query parameters to navigate:

```http
/api/products/?page=2&limit=20
```

---

## Filtering & Searching

Products support advanced filtering:

```http
/api/products/?category=Electronics&brand=TechBrand&q=laptop&sort=-price
```

- **category**: Filter by category name or ID
- **brand**: Filter by brand
- **q**: Search in name and description
- **sort**: Order by field (prefix with `-` for descending)

---

## Admin Panel

All models are registered in Django admin at:

```http
http://localhost:8000/admin/
```

Features:

- List views with search and filters
- Inline editing for related models
- Bulk actions
- Field grouping for complex models
