import { Avatar } from "./BlogCard";
export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="text-2xl">Medium</div>
      <div className="pt-1">
        <Avatar size={8} authName="Sparsh Shukla" />
      </div>
    </div>
  );
};
