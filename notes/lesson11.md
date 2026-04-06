# Ant Design + React + React Query + Context/Zustand

# Lesson 8 --- Ôn tập CRUD + Auth + Custom Hook

---

# Nội dung bài học

- Ant Design (Table + Form)
- React Query (useQuery, useMutation)
- Context API / Zustand (quản lý auth)
- Custom Hook (tái sử dụng logic)
- Flow CRUD thực tế

👉 Bài toán: **CRUD Products (Quản lý sản phẩm)**

---

# 1. Tổng quan bài toán

## Authentication

- Login
- Lưu user + token
- Logout

## Products

- Danh sách sản phẩm
- Thêm sản phẩm
- Sửa sản phẩm
- Xoá sản phẩm

---

# 2. Cấu trúc dữ liệu Product

```json
{
  "id": 1,
  "name": "iPhone 15",
  "price": 25000000,
  "category": "Phone",
  "image": "https://product.hstatic.net/200000456405/product/52649_dien_thoai_thong_minh_apple_iphone_15_pro_xanh_4_8796820263cb4842b005a73523dc58dd.png",
  "description": "sản phẩm tốt"
}
```

---

# 3. API cần có

## Auth

- POST /login

## Products

- GET /products
- GET /products/:id
- POST /products
- PUT /products/:id
- DELETE /products/:id

---

# 4. Ôn tập Ant Design

## Table

- Hiển thị danh sách
- Columns: name, price, category, action
- Có loading

## Form

- Input, InputNumber, Select, TextArea
- Validate
- Submit + Fill data khi edit

---

# 5. React Query

## useQuery

- Lấy danh sách
- Lấy chi tiết

## useMutation

- Create / Update / Delete

## invalidateQueries

- Reload data sau CRUD

---

# 6. Auth (Context / Zustand)

- Lưu user + token
- Login → lưu localStorage
- Logout → clear

---

# 7. Custom Hook

- useProducts

👉 Giúp tái sử dụng logic

---

# 9. Bài tập thực hành

## Bài 1 --- Login

- Form login
- Lưu token

## Bài 2 --- List

- Table + useQuery

## Bài 3 --- Create

- Form + POST

## Bài 4 --- Update

- Fill + PUT

## Bài 5 --- Delete

- Confirm + DELETE

## Bài 6 --- Custom Hook

- Tách logic

---

# 10. Tổng kết

- Ant Design → UI
- React Query → Data
- Context/Zustand → State
- Custom Hook → Clean code

---
