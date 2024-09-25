import axios from "axios";
import { Appbar } from "../components/AppBar";
import { Backend_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from reloading the page
    try {
      const response = await axios.post(
        `${Backend_URL}/api/v1/blog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Failed to post blog", error);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center grid grid-cols-5 pt-10">
        <div className="w-full max-w-full col-start-2 col-span-3">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Title"
            type="text"
          />
        </div>
      </div>
      <div className="grid grid-cols-5 pt-10">
        <div className="col-start-2 col-span-3">
          <form onSubmit={handleSubmit}>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
              <div className="px-4 py-2 bg-white rounded-t-lg ">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="comment"
                  rows={4}
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center pt-4 pb-4 px-3 py-2 border-t">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200"
                >
                  Post Blog
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
