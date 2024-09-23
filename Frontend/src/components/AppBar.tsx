import { Avatar } from "./BlogCard";
import { useBlogs } from "../hooks";
export const Appbar = () => {
  const { blogs } = useBlogs();
  let s = blogs[0];
  console.log(s);
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="text-2xl">Medium</div>
      <div className="pt-1">
        <Avatar size={10} authName={"s"} />
      </div>
    </div>
  );
};
