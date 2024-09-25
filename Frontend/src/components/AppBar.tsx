import { Avatar } from "./BlogCard";
import { useBlogs } from "../hooks";
import { Link } from "react-router-dom";
export const Appbar = () => {
  const { blogs } = useBlogs();
  let s = blogs[0];
  console.log(s);

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/blogs"}>
        <div className="text-4xl">Medium</div>
      </Link>

      <div className="flex pt-1">
        <div className="pr-10">
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 "
            >
              Create New Blog
            </button>
          </Link>
        </div>
        <Avatar size={10} authName={"s"} />
      </div>
    </div>
  );
};
