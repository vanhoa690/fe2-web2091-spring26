import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Button } from "antd";

export default function Navbar() {
  const context = useContext(UserContext);
  if (!context) return null;
  const { user, setUser } = context;

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
          <span>User: {user?.name || "Guest"}</span>
          <Button onClick={() => setUser({ name: "hoadv21" })}>Login</Button>
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
