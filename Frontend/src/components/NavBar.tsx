import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div>
      <nav className="border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a
            href="https://bloging-app-sepia.vercel.app/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://icdl.org/wp-content/uploads/2019/06/Coding-Principles-Icon.png"
              className="h-14 font-mono"
              alt="Blogify Logo"
            />
            <span className="text-black font-serif self-center text-2xl font-semibold whitespace-nowrap ">
              Blogify
            </span>
          </a>

          <div className="flex text-black ">
            <Link to={"/"}>
              <div className="pr-10 font-normal text-lg">Home</div>
            </Link>

            <Link to={"/signin"}>
              <button className="pr-4 font-normal text-lg">SignIn</button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="border-b border-black" />
    </div>
  );
};
