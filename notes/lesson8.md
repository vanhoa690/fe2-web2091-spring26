# Lesson 8 -- Context API (Quản lý State toàn cục trong React)

---

## Nội dung bài học

- Context API là gì?
- Vì sao cần dùng Context API?
- Cách sử dụng Context API
- So sánh với props
- Ví dụ thực tế
- Hạn chế
- Hướng nâng cấp Zustand
- Bài tập thực hành

---

## 1. Context API là gì?

Context API giúp chia sẻ dữ liệu giữa nhiều component mà không cần
truyền props qua nhiều cấp.

---

## 2. Vì sao phải dùng?

### Không dùng

Phải truyền props qua nhiều tầng → rối, khó maintain

### Dùng Context

Component nào cũng truy cập được state chung

---

# 📁 Cấu trúc project

    src/
     ├── context/
     │    └── UserContext.tsx
     ├── components/
     │    ├── Header.tsx
     │    └── Login.tsx
     ├── App.tsx
     ├── main.tsx
     └── index.css

---

# 📁 src/context/UserContext.tsx

```tsx
import { createContext, useState, ReactNode } from "react";

export interface User {
  name: string;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

# 📁 src/components/Header.tsx

```tsx
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Avatar } from "antd";

const Header = () => {
  const context = useContext(UserContext);
  if (!context) return null;

  const { user } = context;

  return (
    <div style={{ display: "flex", gap: 10, padding: 20 }}>
      {user ? (
        <>
          <Avatar src={user.avatar} />
          <span>{user.name}</span>
        </>
      ) : (
        <span>Chưa đăng nhập</span>
      )}
    </div>
  );
};

export default Header;
```

---

# 📁 src/components/Login.tsx

```tsx
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "antd";

const Login = () => {
  const context = useContext(UserContext);
  if (!context) return null;

  const { setUser } = context;

  const handleLogin = () => {
    setUser({
      name: "hoadv21",
      avatar: "https://i.pravatar.cc/150",
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={handleLogin}>
        Login
      </Button>

      <Button danger onClick={handleLogout} style={{ marginLeft: 10 }}>
        Logout
      </Button>
    </div>
  );
};

export default Login;
```

---

# 📁 src/App.tsx

```tsx
import Header from "./components/Header";
import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <Header />
      <Login />
    </div>
  );
};

export default App;
```

---

# 📁 src/main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
```

---

# 🔄 FLOW HOẠT ĐỘNG

1.  App được bọc bởi UserProvider
2.  UserProvider giữ state user
3.  Header đọc user từ Context
4.  Login gọi setUser
5.  Context thay đổi → Header re-render

---

# Tư duy quan trọng

- Context = global state nhẹ
- Không dùng cho data lớn
- Dùng cho:
  - Auth
  - Theme
  - Settings

## 4. Ví dụ

- Header hiển thị user
- Login update user

---

## 5. So sánh

| Props     | Context   |
| --------- | --------- |
| Đơn giản  | Mạnh hơn  |
| Khó scale | Scale tốt |

---

## 6. Hạn chế

- Re-render nhiều
- Khó tối ưu
- Không có devtools mạnh

---

## 7. Khi nào dùng

- User, theme, language
- Data lớn, update liên tục

---

## 8. Bài tập

### Bài 1 – Tạo User Context

- Tạo UserContext + hiển thị Header
- Yêu cầu:
- Lưu:
- name
- avatar
- Hiển thị ở Header

### Bài 2 – Login giả lập

- Login giả lập
- Yêu cầu:
- Click button → set user
- Header update ngay

### Bài 3 – Logout

- Logout
  - Yêu cầu:
  - Button logout → setUser(null)

### Bài 4 Theme Context (Nâng cao)

- Theme toggle
  - Yêu cầu:
  - Toggle dark / light
    - Dùng Ant Design theme

### Bài 5 – Tách Context

- Yêu cầu:
- Tạo:
  - UserContext
  - ThemeContext

---

## Tổng kết

- Context tránh props drilling
- Phù hợp state global nhỏ
- Dự án lớn → Zustand
