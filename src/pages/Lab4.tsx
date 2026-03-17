import { Button, Form, Input } from "antd";

export default function StoryForm() {
  const onFinish = (values: any) => {
    console.log("submit", values);
  };
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Title" name="title">
        <Input placeholder="title" />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}
