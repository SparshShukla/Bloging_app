import { useEffect, useState } from "react";
import { Backend_URL } from "../config";
import axios from "axios";
interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}
export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(`${Backend_URL}/api/v1/blog/bulk`);
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(`${Backend_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data);
        console.log(response);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};
