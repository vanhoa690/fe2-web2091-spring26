import { Button } from "antd";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export function Navbar() {
  const context = useContext(UserContext);

  if (!context) return;
  const { user, setUser } = context;
  console.log("User from context:", user?.name);

  const handleLogin = () => {
    setUser({
      name: "hoadv21",
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="#" className="text-xl font-semibold">
          <strong>WEB2091 App</strong>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="#" className="hover:text-gray-200">
            Trang chủ
          </Link>
          <Link to="/list" className="hover:text-gray-200">
            Danh sách
          </Link>
          <Link to="/add" className="hover:text-gray-200">
            Thêm mới
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <span>Username: {user?.name}</span>
          <Button onClick={handleLogin}>Login</Button>
          <Link to="#" className="hover:text-gray-200">
            Đăng nhập
          </Link>
          <Link to="#" className="hover:text-gray-200">
            Đăng ký
          </Link>
        </div>
      </div>
    </nav>
  );
}
