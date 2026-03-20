import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useEffect } from "react";

export function EditStory() {
  const { data } = useQuery({
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories/1");
      return res.data;
    },
    queryKey: ["story"],
  });

  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const onFinish = (values: any) => {
    console.log(values);
    mutate(values);
  };

  const { mutate } = useMutation({
    mutationFn: async (values: any) => {
      await axios.put("http://localhost:3000/stories/1", values);
    },
  });
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item label="Ten truyen" name="title">
        <Input />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}
