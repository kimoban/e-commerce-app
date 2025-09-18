import requests

BASE_URL = "https://e-commerce-app-ss2x.onrender.com"

# 1. Swagger Docs
def test_swagger():
    r = requests.get(f"{BASE_URL}/swagger/")
    assert r.status_code == 200
    print("Swagger accessible: PASSED")

# 2. User Registration
def test_register():
    r = requests.post(f"{BASE_URL}/api/auth/register/", data={
        "email": "testuser2025@example.com",
        "password": "TestPass123"
    })
    assert r.status_code in [200, 201], f"Registration failed: {r.text}"
    print("User registration: PASSED")

# 3. Login
def test_login():
    r = requests.post(f"{BASE_URL}/api/auth/login/", data={
        "email": "testuser2025@example.com",
        "password": "TestPass123"
    })
    assert r.status_code == 200, f"Login failed: {r.text}"
    token = r.json().get("access")
    print("User login: PASSED")
    return token

# 4. Products API
def test_products(token):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/api/products/", headers=headers)
    assert r.status_code == 200, f"Products list failed: {r.text}"
    print("Products list: PASSED")
    # Optionally test product detail if products exist
    products = r.json()
    if products and hasattr(products, '__getitem__') and len(products) > 0:
        product_id = products[0].get('id')
        if product_id:
            r2 = requests.get(f"{BASE_URL}/api/products/{product_id}/", headers=headers)
            assert r2.status_code == 200, f"Product detail failed: {r2.text}"
            print("Product detail: PASSED")

# 5. Categories API
def test_categories(token):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/api/categories/", headers=headers)
    assert r.status_code == 200, f"Categories list failed: {r.text}"
    print("Categories list: PASSED")

if __name__ == "__main__":
    test_swagger()
    test_register()
    token = test_login()
    test_products(token)
    test_categories(token)
    print("All endpoint tests completed!")
