import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

export default function StoryForm() {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: any) => {
      await axios.post("http://localhost:3000/stories", values);
    },
    onSuccess: () => {
      toast.success("Story created successfully!");
    },
    onError: () => {
      toast.error("Failed to create story.");
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Title" name="title">
        <Input placeholder="title" />
      </Form.Item>
      <Button htmlType="submit" loading={isPending} type="primary">
        Submit
      </Button>
      {isSuccess && (
        <div style={{ color: "green" }}>Story created successfully!</div>
      )}
    </Form>
  );
}
