import { Blogcard } from "../components/BlogCard";
import { Appbar } from "../components/AppBar";
import { useBlogs } from "../hooks";
export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>loading....</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex grid grid-cols-9 pt-2">
        <div className="col-start-3 col-span-5 ">
          {blogs.map((blog) => (
            <Blogcard
              authName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={"Dec 3,2023"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
