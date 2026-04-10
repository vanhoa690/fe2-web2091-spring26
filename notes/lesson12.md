# Ant Design + React + React Query

# Lesson 12 --- Bearer Token và Axios Interceptor

---

# Nội dung bài học

Trong bài này chúng ta sẽ học chi tiết về:

- Bearer Token là gì
- Cách API xác thực người dùng
- Gửi Bearer Token khi call API
- Config Axios để tự động gửi token
- Axios Interceptor
- Flow authentication thực tế

---

# 1. Authentication trong hệ thống API

Trong các hệ thống web hiện đại:

Client (React / Angular / Mobile) → gọi API → Server kiểm tra quyền truy
cập.

Ví dụ:

    GET /products

Server cần biết:

- Người nào gọi API
- Người đó đã login chưa
- Có quyền hay không

Vì vậy cần **Authentication**.

---

# 2. Token là gì?

Token là một chuỗi ký tự dùng để **xác thực người dùng**.

Ví dụ:

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Token thường là **JWT (JSON Web Token)**.

Token sẽ được server trả về sau khi login.

---

# 3. Flow đăng nhập

Bước 1

User nhập:

- email
- password

Bước 2

Client gửi request:

    POST /login

Body:

    {
      "email": "admin@gmail.com",
      "password": "123456"
    }

Bước 3

Server kiểm tra đúng → trả về:

    {
      "user": {
        "id": 1,
        "email": "admin@gmail.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }

---

# 4. Lưu token ở Client

Sau khi login thành công, client sẽ lưu token.

Ví dụ:

```javascript
localStorage.setItem("token", token);
```

Kiểm tra:

```javascript
localStorage.getItem("token");
```

---

# 5. Vì sao cần gửi token khi call API

Ví dụ user gọi:

    GET /products

Server cần biết:

- Request này của ai
- Có quyền xem products không

Vì vậy client cần gửi token kèm theo request.

---

# 6. Bearer Token

Token sẽ được gửi qua **HTTP Header**.

Header chuẩn:

    Authorization: Bearer <token>

Ví dụ:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

Bearer nghĩa là:

"Người sở hữu token này được phép truy cập".

---

# 7. Ví dụ Request thực tế

    GET /products

Headers:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

Server đọc token → xác thực → trả dữ liệu.

---

# 8. Gửi Bearer Token bằng Axios

Ví dụ đơn giản:

```javascript
import axios from "axios";

const token = localStorage.getItem("token");
// zustand
// const token = useAuthStore((state) => state.token);

axios.get("http://localhost:3000/products", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

Nhược điểm:

- Phải viết lại mỗi request
- Code bị lặp

---

# 9. Giải pháp --- Axios Instance

Ta tạo một instance axios riêng.

Tạo file:

    src/api/axiosClient.js

Code:

```javascript
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

export default axiosClient;
```

---

# 10. Axios Interceptor là gì

Interceptor giúp:

- chặn request trước khi gửi
- thêm token tự động
- xử lý lỗi response

Flow:

    Request
     ↓
    Interceptor
     ↓
    Server

---

# 11. Thêm Bearer Token bằng Interceptor

```javascript
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // zustand
  // const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
```

Ý nghĩa:

Trước khi request gửi đi:

→ lấy token → thêm vào header.

---

# 12. Sử dụng axiosClient

Thay vì:

```javascript
axios.get("/products");
```

Ta dùng:

```javascript
axiosClient.get("/products");
```

Token sẽ **tự động được thêm vào**.

---

# 13. Ví dụ dùng với React Query

```javascript
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";

const { data } = useQuery({
  queryKey: ["products"],
  queryFn: () => axiosClient.get("/products"),
});
```

Axios interceptor sẽ tự động thêm token.

---

# 14. Xử lý lỗi 401

Server có thể trả:

    401 Unauthorized

Ví dụ:

- token hết hạn
- token sai
- chưa login

Ta có thể xử lý trong interceptor.

```javascript
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
```

---

# 15. Flow Authentication hoàn chỉnh

    User login
       ↓
    Server trả token
       ↓
    Lưu localStorage
       ↓
    Axios interceptor thêm token
       ↓
    Call API
       ↓
    Server xác thực token
       ↓
    Trả dữ liệu

---

# 16. Best Practice

Nên tách cấu trúc project:

    src
     ├ api
     │   └ axiosClient.js
     ├ pages
     │   ├ Login.jsx
     │   └ Products.jsx
     ├ hooks
     │   └ useProducts.js

---

# 17. Bài tập thực hành

## Bài 1 --- Axios Instance

Tạo file:

    api/axiosClient.js

Config baseURL.

---

## Bài 2 --- Axios Interceptor

Thêm interceptor để:

- lấy token từ localStorage
- thêm Bearer Token vào header.

---

## Bài 3 --- Call API Products

Sử dụng:

- React Query
- axiosClient

Hiển thị danh sách sản phẩm.

---

## Bài 4 --- Xử lý 401

Trong interceptor:

Nếu server trả:

    401

→ Xoá token và redirect login.

---

# Tổng kết

Trong bài này chúng ta đã học:

- Bearer Token
- Cách gửi token qua header
- Axios Instance
- Axios Interceptor
- Flow Authentication trong ứng dụng React
