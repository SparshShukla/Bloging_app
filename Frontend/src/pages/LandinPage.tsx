import { Link } from "react-router-dom";
import { Navbar } from "../components/NavBar";

export const LandingPage = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-40 right-0">
        <div className="flex justify-center items-center">
          <img
            src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
            alt="Banner"
            style={{ width: "500px" }}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 opacity-90">
        <Navbar />
      </div>
      <div className="relative h-32 w-32 ">
        <div className="absolute inset-y-0 left-0 width-60 pt-48 text-8xl pl-32">
          <p className="font-serif">
            Human
            <br />
            stories & ideas
            <br />
          </p>
          <div className="text-2xl pt-6">
            A place to read, write, and deepen your understanding
          </div>
          <div className="text-xl pt-10">
            <Link to={"/signup"}>
              <button
                type="button"
                className="text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-extralight rounded-full text-3xl px-5 py-2.5 me-2 mb-2 "
              >
                Start Reading
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
