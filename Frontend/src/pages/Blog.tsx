import { Appbar } from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-10">
        <div className="col-start-3 col-span-6">
          <div className=" border-b-4 pb-3 pt-10 antialiased text-4xl font-medium">
            {blog?.title}
          </div>
          <div className="flex pt-7">
            <div className="font-medium text-xl pr-5">Author</div>
            <div className="pr-1">
              <Avatar authName={blog ? blog.author.name : "anonymous"} />
            </div>
            {blog?.author.name}
          </div>
          <div className="pt-7 text-balance indent-14 pb-10">
            <ReactMarkdown>{blog?.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
