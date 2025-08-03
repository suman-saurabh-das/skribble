import axios from "axios";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
// types
import type { ProfileData } from "../../utils/types";
// icons
import { FiInfo } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";

const UpdateProfile = () => {
  const initialData: ProfileData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  };

  const [formData, setFormData] = useState<ProfileData>(initialData);
  const [error, setError] = useState<string>("");

  const { userInfo, setUserInfo } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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

  const validateFormData = (formData: ProfileData) => {
    if (
      formData.name ||
      formData.email ||
      (formData.password && formData.confirmPassword) ||
      formData.pic
    ) {
      if (formData.email && !emailPattern.test(formData.email)) {
        setError("Please enter a valid email!");
        return false;
      }
      if (formData.password || formData.confirmPassword) {
        if (!passwordPattern.test(formData.password)) {
          setError(
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number."
          );
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return false;
        }
      }
      if (formData.pic && !imagePattern.test(formData.pic)) {
        setError("Image link is not valid!");
        return false;
      }
      return true;
    }
    return false;
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo && validateFormData(formData)) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const res = await axios.post("https://skribble-api.onrender.com/api/users/profile", formData, config);
        
        // Save userInfo in context & local storage
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));

        // Reset formData
        setFormData(initialData);
      } catch (error) {
        console.error("Failed to updated profile:", error);
      }
    }
  };

  const handleResetFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(initialData);
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="name">
          Name
        </label>
        <input
          className="bg-lightSurface dark:bg-darkSurface border border-lightSurface dark:border-darkSurface outline-none px-4 py-2 rounded-md"
          name="name"
          onChange={(e) => handleInputChange(e)}
          onFocus={() => setError("")}
          type="text"
          value={formData.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="bg-lightSurface dark:bg-darkSurface border border-lightSurface dark:border-darkSurface outline-none px-4 py-2 rounded-md"
          name="email"
          onChange={(e) => handleInputChange(e)}
          onFocus={() => setError("")}
          type="email"
          value={formData.email}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="bg-lightSurface dark:bg-darkSurface border border-lightSurface dark:border-darkSurface outline-none px-4 py-2 rounded-md"
          name="password"
          onChange={(e) => handleInputChange(e)}
          onFocus={() => setError("")}
          type="password"
          value={formData.password}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="bg-lightSurface dark:bg-darkSurface border border-lightSurface dark:border-darkSurface outline-none px-4 py-2 rounded-md"
          name="confirmPassword"
          onChange={(e) => handleInputChange(e)}
          onFocus={() => setError("")}
          type="password"
          value={formData.confirmPassword}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="pic">
          Profile Picture
        </label>
        <input
          className="bg-lightSurface dark:bg-darkSurface border border-lightSurface dark:border-darkSurface outline-none px-4 py-2 rounded-md"
          name="pic"
          onChange={(e) => handleInputChange(e)}
          onFocus={() => setError("")}
          type="text"
          value={formData.pic}
        />
      </div>

      <div className="mt-4">
        {error ? (
          <p className="bg-lightSurface dark:bg-darkSurface cursor-pointer px-3 py-[10px] rounded-md flex gap-1 text-red-600">
            <FiInfo className="flex-shrink-0 mt-[2.8px]" /> {error}
          </p>
        ) : (
          <div className="flex gap-2 items-center">
            <button
              className="bg-lightSurface hover:bg-lightBg dark:bg-darkSurface hover:dark:bg-darkBg cursor-pointer px-3 py-[10px] rounded-md w-full"
              type="submit"
              onClick={handleUpdateProfile}
            >
              Update profile
            </button>
            <button
              className="bg-lightSurface hover:bg-lightBg dark:bg-darkSurface hover:dark:bg-darkBg cursor-pointer px-3 py-[10px] rounded-md text-xl"
              onClick={handleResetFields}
            >
              <AiTwotoneDelete />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default UpdateProfile;
