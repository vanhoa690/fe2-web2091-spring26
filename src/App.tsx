import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { EditStory } from "./pages/Lab6";
import Navbar from "./components/Header";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
        <Routes>
          <Route path="/edit/:id" element={<EditStory />}></Route>
        </Routes>
        <Layout>
          {/* <Header style={{ color: "white" }}>Header</Header> */}
          <Content style={{ padding: 20 }}>
            {/* <StoryList /> */}
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
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>

      <Toaster />
    </>
  );
}

export default App;
