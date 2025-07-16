import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState<string>("login");

  return (
    <div className="bg-white flex flex-col md:flex-row items-center justify-evenly min-h-screen text-black lg:px-28 mx-auto max-w-screen-2xl">
      {/* Hero container */}
      <div className="mt-8 mb-12 relative w-[80%] md:w-[40%] lg:w-[50%]">
        <h1 className="font-bold relative top-2 md:top-0 lg:top-10 text-4xl">
          Goodbye !<br /> book & pen
        </h1>
        <div className="max-w-lg">
          <img className="w-full" src="/auth-img.png" alt="" />
        </div>
        <h1 className="font-bold text-4xl">Hello skribble</h1>
        <h5 className="mt-2 text-xs">Keep your information in our app</h5>
      </div>

      {/* Registration/Login container */}
      <div className="w-full md:w-[40%] lg:w-[30%]">
        <div className="bg-blue-100 font-semibold flex gap-6 justify-evenly mx-auto p-2 rounded-full text-[13px] w-fit">
          <button
            className={`${
              currentForm === "login"
                ? "bg-bluePrimary text-white"
                : "text-blue-900"
            } p-3 rounded-full w-32`}
            onClick={() => setCurrentForm("login")}
          >
            Login
          </button>
          <button
            className={`${
              currentForm === "register"
                ? "bg-bluePrimary text-white"
                : "text-blue-900"
            } p-3 rounded-full w-32`}
            onClick={() => setCurrentForm("register")}
          >
            Register
          </button>
        </div>
        <div className="mt-2 sm:mt-4">
          {currentForm === "login" && <Login />}
          {currentForm === "register" && <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
