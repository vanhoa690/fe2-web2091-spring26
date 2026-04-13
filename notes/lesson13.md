# Ant Design + React + React Query

# Lesson 13 --- Private Route (Protected Route)

---

## Nội dung bài học

Trong bài này chúng ta sẽ hiểu rõ:

- Private Route là gì và dùng khi nào
- Vì sao cần bảo vệ route trong ứng dụng React
- Cách kiểm tra trạng thái đăng nhập bằng token
- Cách xây dựng Protected Route
- Cách redirect khi chưa login
- Kết hợp với React Router
- Flow authentication thực tế trong project

---

## 1. Private Route là gì?

Private Route (Protected Route) là những route **chỉ cho phép người dùng
đã đăng nhập truy cập**.

Ví dụ:

- `/login` → ai cũng vào được (Public)
- `/products` → chỉ user đã login (Private)

👉 Mục tiêu: bảo vệ dữ liệu và chức năng bên trong hệ thống.

---

## 2. Vì sao cần Private Route

Nếu không có bảo vệ:

Người dùng có thể truy cập trực tiếp URL:

    http://localhost:3000/products

👉 Mà không cần login.

⚠️ Đây là lỗi rất phổ biến khi mới học.

---

## 3. Kiểm tra user đã login

Sau khi login, ta thường lưu token:

```js
localStorage.setItem("token", token);
```

Kiểm tra:

```js
const token = localStorage.getItem("token");
```

- Có token → đã login
- Không có → chưa login

---

## 4. Protected Route Component

Tạo component dùng để bảo vệ route:

```js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Nếu chưa login → chuyển về login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã login → render component
  return children;
};

export default ProtectedRoute;
```

Giải thích:

- `children`: component bên trong (VD: Products)
- `Navigate`: dùng để redirect
- `replace`: không cho quay lại trang cũ bằng back

---

## 5. Sử dụng Protected Route

```js
<Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
```

Flow:

- Có token → render Products
- Không có → chuyển về login

---

## 6. Public Route (ngược lại)

Dùng để **chặn user đã login vào trang login**

```js
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/products" replace />;
  }

  return children;
};
```

---

## 7. Logout

Khi logout:

```js
localStorage.removeItem("token");
```

Thường kết hợp:

```js
navigate("/login");
```

---

## 8. Flow Authentication thực tế

    User login
       ↓
    Server trả token
       ↓
    Lưu localStorage
       ↓
    Private Route kiểm tra
       ↓
    Cho phép truy cập
       ↓
    Axios gửi token khi call API
       ↓
    Server validate token
       ↓
    401 → logout

---

## 9. Lưu ý quan trọng

- Private Route chỉ bảo vệ phía client (UI)
- Backend vẫn phải kiểm tra token
- Không bao giờ tin client 100%

---

## 17. Bài tập thực hành

### Bài 1 --- Protected Route

Tạo component:

`ProtectedRoute.jsx`

- Kiểm tra token
- Redirect về `/login` nếu chưa login

---

### Bài 2 --- Áp dụng vào Products

- Route `/products` phải được protected
- Nếu chưa login → không truy cập được

---

### Bài 3 --- Public Route

- Không cho user đã login truy cập `/login`

---

### Bài 4 --- Logout

Tạo nút logout:

```js
localStorage.removeItem("token");
navigate("/login");
```

---

### Bài 5 --- Test flow

Test các case:

- Chưa login → truy cập `/products`
- Đã login → truy cập `/products`
- Xoá token → reload trang
- Token sai → bị `401 Unauthorized`

---

## Tổng kết

- Private Route giúp bảo vệ UI
- Kết hợp với Axios Interceptor để bảo mật API
- Backend luôn phải xác thực token
