import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";

export default function StoryForm() {
  const { mutate } = useMutation({
    mutationFn: async (values: any) => {
      await axios.post("http://localhost:3000/stories", values);
    },
  });
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    mutate(values);
  };
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Author" name="author">
        <Input />
      </Form.Item>
      <Form.Item label="Image" name="image">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}
