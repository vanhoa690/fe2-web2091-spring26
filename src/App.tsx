import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Image, InputNumber, Layout, Select } from "antd";
import { Form, Input, Button } from "antd";
import { Table } from "antd";
import StoryForm from "./pages/Lab4";
import { StoryList } from "./pages/Lab5";

const { Header, Content, Footer } = Layout;
function App() {
  //
  const onFinish = (values: any) => {
    console.log("onFinish");

    console.log(values);
  };

  const columns = [
    { title: "Ho va ten", dataIndex: "name" },
    { title: "Do tuoi", dataIndex: "age" },
    { title: "Mon hoc", dataIndex: "subject" },
    {
      title: "Hinh anh",
      dataIndex: "image",
      render: (image: string) => (
        <Image src={image} alt="hinh anh" width={100} height={100} />
      ),
    },
  ];
  const data = [
    {
      key: 1,
      name: "John",
      age: 25,
      subject: "Math",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7PetZoiMvh8-TEPna1ga9r6kDQDENKuWQFfXT-0&usqp=CAE&s",
    },
    {
      key: 2,
      name: "Anna",
      age: 30,
      subject: "Science",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7PetZoiMvh8-TEPna1ga9r6kDQDENKuWQFfXT-0&usqp=CAE&s",
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
        <Layout>
          <Header style={{ color: "white" }}>Header</Header>
          <Content style={{ padding: 20 }}>
            <StoryList />
            {/* <StoryForm /> */}
            {/* <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  { min: 4, message: "Username must be at least 4 characters" },
                ]}
              >
                <Input placeholder="username" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password placeholder="password" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.TextArea placeholder="password" />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input the price!" },
                  {
                    min: 1,
                    message: "Price must be a positive number",
                    type: "number",
                  },
                ]}
              >
                <InputNumber type="number" placeholder="price" />
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Select
                  options={[
                    { value: 1, label: "Option 1" },
                    { value: 2, label: "Option 2" },
                  ]}
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 1 }}
              // loading={true}
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
