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
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const response = await axios.get(`${Backend_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBlogs(response.data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);
  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const response = await axios.get(`${Backend_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBlog(response.data);
      setLoading(false);
    };
    fetchBlogs();
  }, [id]);
  return {
    loading,
    blog,
  };
};
