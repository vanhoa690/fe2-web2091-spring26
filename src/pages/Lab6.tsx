import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useEffect } from "react";

export default function EditStory() {
  // get data
  const { data } = useQuery({
    queryKey: ["story"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories/1");
      return res.data;
    },
  });

  const [form] = Form.useForm();
  // fill form
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <Form.Item label="Ten truyen" name="title">
        <Input />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}
