# Lesson 10 -- Custom Hooks + React Query (Stories)

---

## Nội dung

- Hook là gì?
- Custom Hook + React Query
- useStoryList, useAddStory, useDeleteStory
- Auto refetch

---

## 1. Hook là gì?

Hook là các hàm đặc biệt trong React giúp:

- Quản lý state (`useState`)
- Xử lý lifecycle (`useEffect`)
- Truy cập context (`useContext`)
- Thao tác DOM (`useRef`)

👉 Chỉ sử dụng trong **Function Component**

---

## 2. Custom Hook là gì?

Custom Hook là hook do chúng ta tự tạo để tái sử dụng logic.

👉 Quy ước: phải bắt đầu bằng use

### 3. Khi nào nên dùng Custom Hook?

- Khi logic bị lặp lại nhiều nơi
- Khi muốn tách riêng phần xử lý API
- Khi component quá dài / khó đọc
- Khi muốn tái sử dụng logic

### 4. Ưu điểm của Custom Hook

- Tái sử dụng code
- Code sạch, dễ đọc
- Tách logic khỏi UI
- Dễ maintain
- Dễ test

### 5. Nhược điểm của Custom Hook

- Khó debug nếu viết không rõ ràng
- Dễ lạm dụng (hook quá nhiều)
- Có thể bị phụ thuộc lẫn nhau
- Nếu thiết kế kém → khó mở rộng

---

## 1. src/hooks/useStoryList

```ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStoryList = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });
};
```

---

## 2. src/hooks/useAddStory

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post("http://localhost:3000/stories", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
};
```

---

## 3. src/hooks/useDeleteStory

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
};
```

---

## 4. StoryList UI

```tsx
import { Table, Image, Spin, Button } from "antd";
import { useStoryList } from "../hooks/useStoryList";
import { useDeleteStory } from "../hooks/useDeleteStory";

const StoryList = () => {
  const { data, isLoading, isError } = useStoryList();
  const { mutate } = useDeleteStory();

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (url: string) => <Image src={url} width={60} />,
    },
    { title: "Tên truyện", dataIndex: "title" },
    { title: "Tác giả", dataIndex: "author" },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <Button danger onClick={() => mutate(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  if (isLoading) return <Spin />;
  if (isError) return <p>Lỗi</p>;

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default StoryList;
```

---

## 5. AddStory UI

```tsx
import { Form, Input, Button } from "antd";
import { useAddStory } from "../hooks/useAddStory";

const AddStory = () => {
  const { mutate, isPending } = useAddStory();

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="title">
        <Input placeholder="Tên truyện" />
      </Form.Item>
      <Form.Item name="author">
        <Input placeholder="Tác giả" />
      </Form.Item>
      <Form.Item name="image">
        <Input placeholder="Ảnh" />
      </Form.Item>
      <Form.Item name="description">
        <Input />
      </Form.Item>

      <Button htmlType="submit" loading={isPending}>
        Thêm
      </Button>
    </Form>
  );
};

export default AddStory;
```

---

## Flow

- useQuery → load list
- useMutation → add/delete
- invalidateQueries → reload UI

---

## Bài tập (Custom Hook + React Query)

---

### Bài 1 – useUpdateStory

#### Yêu cầu

- Tạo custom hook `useUpdateStory`
- Sử dụng `useMutation`
- Gọi API: PUT http://localhost:3000/stories/:id

#### Kết quả mong muốn

- Có thể chỉnh sửa (edit) thông tin truyện
- Sau khi update → danh sách tự động reload

---

### Bài 2 – useCRUDStory

Gộp tất cả logic vào 1 hook duy nhất:

```ts
const { list, add, remove, update } = useCRUDStory();
```

**Gợi ý**
Bên trong sử dụng:

- useQuery → lấy danh sách
- useMutation → thêm / xóa / sửa
- Dùng invalidateQueries để reload data
