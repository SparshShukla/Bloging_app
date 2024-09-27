import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/"}>
        <div className="flex">
          <img
            src="https://icdl.org/wp-content/uploads/2019/06/Coding-Principles-Icon.png"
            className="h-12 pr-3 pl-3 font-mono "
            alt="Blogify Logo"
          />
          <button className="text-4xl">Blogify</button>
        </div>
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
