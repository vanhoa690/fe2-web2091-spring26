# Ant Design + React + React Query

# Lesson 13 --- Private Route (Protected Route)

---

## Nội dung bài học

- Private Route là gì
- Vì sao cần bảo vệ route
- Kiểm tra login bằng token
- Tạo component Protected Route
- Redirect khi chưa login
- Kết hợp với React Router
- Flow bảo mật thực tế

---

## 1. Private Route là gì?

Private Route là route chỉ cho phép truy cập khi user đã đăng nhập.

---

## 2. Vì sao cần Private Route

Nếu không có bảo vệ, user có thể truy cập trực tiếp URL mà không cần
login.

---

## 3. Kiểm tra user đã login

```js
const token = localStorage.getItem("token");
```

---

## 4. Protected Route Component

```js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

---

## 5. Sử dụng

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

---

## 6. Public Route

```js
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

```js
localStorage.removeItem("token");
```

---

## 8. Flow Authentication

User login → lưu token → Private Route check → gọi API → 401 → logout

---

## 17. Bài tập thực hành

### Bài 1 — Protected Route

Tạo component:

`ProtectedRoute.jsx`

- Kiểm tra token
- Redirect về `/login` nếu chưa login

---

### Bài 2 — Áp dụng vào Products

- Route `/products` phải được protected
- Nếu chưa login → không truy cập được

---

### Bài 3 — Public Route

- Không cho user đã login truy cập `/login`

---

### Bài 4 — Logout

Tạo nút logout:

```js
localStorage.removeItem("token");
navigate("/login");
```

---

## Tổng kết

- Private Route bảo vệ UI
- Kết hợp với Axios Interceptor
- Backend vẫn phải xác thực

```

```
