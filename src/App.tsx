import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Form, Input, Button, Table, InputNumber, Select } from "antd";
import { Layout } from "antd";
import { Image } from "antd";
import StoryForm from "./pages/Lab4";
import StoryList from "./pages/Lab5";
const { Header, Content, Footer } = Layout;

function App() {
  const onFinish = (values: any) => {
    console.log(values);
  };

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "Tuổi", dataIndex: "age" },
    { title: "Môn học", dataIndex: "subject" },
    {
      title: "Avatart",
      dataIndex: "avatar",
      render: (avatar: string) => <Image width={50} src={avatar} />,
    },
  ];

  const data = [
    {
      key: 1,
      name: "John",
      age: 25,
      subject: "FE2",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      key: 2,
      name: "Anna",
      age: 30,
      subject: "FE1",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  ];

  return (
    <>
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
            <Link to="#" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
        <Button type="primary">Click me</Button>
        <Layout>
          <Header style={{ color: "white" }}>Header</Header>
          <Content style={{ padding: 20 }}>
            <StoryList />
            {/* <StoryForm /> */}
            {/* <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ maxWidth: 400 }}
            >
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { min: 0, type: "number", message: "Gia phai lon hon khong" },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Select
                  options={[
                    {
                      value: "FE1",
                      label: "FE1",
                    },
                    {
                      value: "FE2",
                      label: "FE2",
                    },
                  ]}
                  placeholder="Chọn môn học"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form> */}
            {/* <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 1 }}
            /> */}
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>

      <Toaster />
    </>
  );
}

export default App;
