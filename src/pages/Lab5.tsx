import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Popconfirm, Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useStoryList } from "../hooks/useStoryList";
export default function StoryList() {
  const { data, isLoading, isError } = useStoryList();

  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: () => {
      toast.success("Xoa truyen thanh cong");
      qc.invalidateQueries({ queryKey: ["stories"] });
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
    {
      title: "Action",
      render: (_: any, record: any) => (
        <>
          <Popconfirm
            title="Delete the story"
            description="Are you sure to delete this story?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => mutate(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button type="primary">
            <Link to={`/edit/${record.id}`}>Edit</Link>
          </Button>
        </>
      ),
    },
  ];

  if (isError) {
    return <div>Co loi xay ra</div>;
  }
  return <Table columns={columns} dataSource={data} loading={isLoading} />;
}
