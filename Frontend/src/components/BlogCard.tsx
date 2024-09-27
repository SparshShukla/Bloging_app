import { Link } from "react-router-dom";

interface BlogCardInterface {
  authName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
export const Blogcard = ({
  authName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardInterface) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 pb-4 border-slate-200 pt-3">
        <div className="flex ">
          <div className="flex justify-center flex-col pt-1">
            <Avatar authName={authName} />
          </div>

          <div className="pl-2 pr-2 pt-2 font-light text-xs">
            {authName.toUpperCase()}
          </div>
          <div className="flex flex-col justify-center pr-2 pt-1">
            <Circle />
          </div>
          <div className="font-thin pt-2 text-xs">{publishedDate}</div>
          <div className="text-amber-400 flex flex-col justify-center text-xs pl-1 pt-1 ">
            &#9733;
          </div>
        </div>
        <div className="font-semibold text-xl pt-2">{title}</div>
        <div className="font-thin text-md  pt-2 line-clamp-3">{content}</div>
        <div className="pt-5 text-sm text-slate-400 font-normal">
          {Math.ceil(content.length / 1000 + 1) + " min read"}
        </div>
      </div>
    </Link>
  );
};
function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
export function Avatar({
  authName,
  size = 6,
}: {
  authName: string;
  size?: number;
}) {
  const sizeClass =
    size === 6 ? "w-6 h-6" : size === 10 ? "w-10 h-10" : `w-${size} h-${size}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full ${sizeClass}`}
    >
      <span className={`${size === 6 ? "text-xs" : "text-xl"} text-gray-800`}>
        {authName.toUpperCase()[0]}
      </span>
    </div>
  );
}
