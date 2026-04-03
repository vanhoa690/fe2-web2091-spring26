// Custom hook useStoryList

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStoryList = () => {
  // call api get story list: useQuery
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });
};

// export const useList = (key: string) => {
//   // call api get story list: useQuery
//   return useQuery({
//     queryKey: [key],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:3000/${key}`);
//       return res.data;
//     },
//   });
// };

// const {} = useList("stories");
// const {} = useList("products");
// const {} = useList("users");
