import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export function Navbar() {
  const { user, setUser } = useAuthStore();
  console.log(user);

  const handleLogin = () => {
    setUser("duyhieu");
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
          <span>Username: {user}</span>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={() => setUser(null)}>Lougout</Button>

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
