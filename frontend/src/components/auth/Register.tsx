import { useState } from "react";
import { FiInfo } from "react-icons/fi";

// types
import type { registerFormData } from "../../utils/types";

const Register = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  };

  const [formData, setFormData] = useState<registerFormData>(initialData);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateFormData = (formData: registerFormData) => {
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
    if (formData.profilePic && !imagePattern.test(formData.profilePic)) {
      setError("Entered link is not valid!");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFormData(formData)) {
      console.log("FORM DATA :", formData);
    }
  };

  return (
    <form
      className="font-medium flex flex-col gap-4 p-4 text-[13px]"
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          className="bg-white border border-neutral-300 outline-none px-4 py-2 rounded-full"
          id="password"
          name="password"
          type="text"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          className="bg-white border border-neutral-300 outline-none px-4 py-2 rounded-full"
          id="confirmPassword"
          name="confirmPassword"
          type="text"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="profile-picture">Profile Picture</label>
        <input
          className="bg-white border border-neutral-300 outline-none px-4 py-2 rounded-full"
          id="profile-picture"
          name="profilePic"
          type="text"
          value={formData.profilePic}
          onChange={handleChange}
        />
      </div>
      {error && (
        <p className="flex gap-1 items-start text-red-500">
          <FiInfo className="flex-shrink-0 mt-[3px]" /> {error}
        </p>
      )}
      <button
        className="bg-bluePrimary hover:bg-blueSecondary font-semibold mt-2 p-3 rounded-full text-white w-32"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};
export default Register;
