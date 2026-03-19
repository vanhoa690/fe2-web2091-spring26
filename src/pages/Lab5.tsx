import { useQuery } from "@tanstack/react-query";
import { Image, Table } from "antd";
import axios from "axios";

export function StoryList() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllStories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });
  const columns = [
    {
      title: "Ten truyen",
      dataIndex: "title",
    },
    {
      title: "Tac gia",
      dataIndex: "author",
    },
    {
      title: "Hinh anh",
      dataIndex: "image",
      render: (src: string) => <Image src={src} height={100} />,
    },
  ];

  return <Table columns={columns} dataSource={data} loading={isLoading} />;
}
