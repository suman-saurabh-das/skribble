import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
// icons
import { FiInfo } from "react-icons/fi";
import { ImSpinner10 } from "react-icons/im";
// types
import type { RegisterFormData } from "../../utils/types";

const Register = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  };

  const [formData, setFormData] = useState<RegisterFormData>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  const navigate = useNavigate();
  const { setUserInfo } = useUser();

  // Setting value from input fields in formData
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co|in|org|net|edu)$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const imagePattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;

  // Function to validate formData
  const validateFormData = (formData: RegisterFormData) => {
    if (!formData.name) {
      setError("Name is required!");
      return false;
    }
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email!");
      return false;
    }
    if (!passwordPattern.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number."
      );
      return false;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }
    if (formData.pic && !imagePattern.test(formData.pic)) {
      setError("Image link is not valid!");
      return false;
    }
    setError("");
    return true;
  };

  // Validates formData, makes an API call to register user, sets userInfo in UserContext and redirects user to skribble home page
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFormData(formData)) {
      try {
        setLoading(true);

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const res = await axios.post("https://skribble-api.onrender.com/api/users/", formData, config);

        // Save userInfo in context & local storage
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));

        setLoading(false);

        // Navigate to skribble home page
        navigate("/skribble");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error?.response?.data?.message || "Request failed!");
        }
        setLoading(false);
      }
    }
  };

  return (
    <form
      className="font-medium flex flex-col gap-4 p-8 sm:p-4 text-[13px]"
      onSubmit={(e) => handleRegisterSubmit(e)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          className="bg-white border border-neutral-300 outline-none px-4 py-2 rounded-full"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          onFocus={() => setError("")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email address</label>
        <input
          className="bg-white border border-neutral-300 outline-none px-4 py-2 rounded-full"
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          onFocus={() => setError("")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          className="bg-white border border-neutral-300 outline-none px-4 py-2 rounded-full"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          onFocus={() => setError("")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          className="bg-white border border-neutral-300 outline-none px-4 py-2 rounded-full"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          onFocus={() => setError("")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="profile-picture">Profile Picture</label>
        <input
          className="bg-white border border-neutral-300 outline-none px-4 py-2 rounded-full"
          id="profile-picture"
          name="pic"
          type="text"
          value={formData.pic}
          onChange={handleInputChange}
          onFocus={() => setError("")}
        />
      </div>
      {error && (
        <p className="flex gap-1 items-start text-red-500">
          <FiInfo className="flex-shrink-0 mt-[3px]" /> {error}
        </p>
      )}
      <button
        className="bg-bluePrimary hover:bg-blueSecondary font-semibold flex items-center justify-center mt-2 p-3 rounded-full text-white w-32"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <ImSpinner10 className="animate-spin text-lg" />
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};
export default Register;
