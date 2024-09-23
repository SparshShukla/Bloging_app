import { Blogcard } from "../components/BlogCard";
import { Appbar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";
export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div>
      <Appbar />
      <div className="flex grid grid-cols-9 pt-2 ">
        <div className="col-start-3 col-span-5 cursor-pointer">
          {blogs.map((blog) => (
            <Blogcard
              authName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={"Dec 3,2023"}
              id={blog.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
