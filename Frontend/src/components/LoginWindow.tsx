import { signupInput } from "@sparsh_shukla/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Backend_URL } from "../config.ts";
import axios from "axios";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<signupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    const response = await axios.post(
      `${Backend_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
      postInputs
    );
    const jwt = response.data;
    console.log(jwt);
    localStorage.setItem("token", jwt);
    navigate("/blogs");
  }

  return (
    <div className="h-screen flex justify-center flex-col bg-slate-100">
      <div className="flex justify-center ">
        <div>
          <div className="font-exta-bold text-5xl">
            Create a Account
            <div className="text-base text-gray-500 font-light font-semibold text-center mt-3">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                className="pl-2 underline font-extralight"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Signup" : "Login"}
              </Link>
            </div>
          </div>
          <div className="pt-6">
            {type === "signup" ? (
              <LabelledInput
                label="Username"
                placeholder="Enter a Username"
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Email"
              placeholder="email@gmail.com"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Password"
              placeholder="Enter a password"
              type={"password"}
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <button
            onClick={sendRequest}
            type="button"
            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};
interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 pt-5 text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
