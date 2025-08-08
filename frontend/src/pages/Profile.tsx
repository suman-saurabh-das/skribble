import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
// components
import UpdateProfile from "../components/profile/UpdateProfile";
// icons
import { GiFeather } from "react-icons/gi";
import { RxDotFilled } from "react-icons/rx";
import { FaReact } from "react-icons/fa";
import { IoArrowBackCircleOutline, IoHelpCircleOutline } from "react-icons/io5";

const Profile = () => {
  const { userInfo } = useUser();

  return (
    <div className="bg-lightHighlight dark:bg-darkHighlight min-h-screen">
      <div className="flex flex-col xl:flex-row gap-16 py-8 px-4 lg:px-12 relative text-black dark:text-white mx-auto max-w-[1920px] xl:h-[calc(100vh-35px)]">
        {/* User profile info & update form */}
        <div className="xl:w-2/5">
          <div className="flex gap-4 items-center">
            <img
              className="w-16 sm:w-28 rounded-full"
              src={userInfo?.pic}
              alt="User"
            />
            <div className="flex flex-col gap-2">
              <h4 className="font-shantel-sans text-xl sm:text-3xl lg:text-2xl">
                Welcome <span className="font-medium">{userInfo?.name}</span>!
              </h4>
              <Link
                to={"/skribble"}
                className="flex gap-1 items-center underline"
              >
                <IoArrowBackCircleOutline className="text-xl sm:text-2xl" /> view Skribbles
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <UpdateProfile />
          </div>
        </div>

        {/* Application guide */}
        <div className="bg-lightSurface dark:bg-darkSurface font-shantel-sans flex flex-col gap-8 xl:h-[calc(100vh-55px)] max-h-fit p-4 lg:p-8 rounded-lg overflow-y-auto xl:w-3/5">
          <div className="flex flex-col gap-4">
            <h2 className="flex gap-2 font-bold text-3xl">
              About Skribble <GiFeather />
            </h2>
            <div className="list-disc">
              Welcome to <span className="font-medium">Skribble</span> — your
              personal digital notebook designed to make note-taking simple,
              secure, and satisfying.
            </div>
            <div className="list-disc">
              Whether you're a student, a creator, or just someone who loves
              organizing thoughts, Skribble gives you the space and tools to
              write freely and creatively.
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl">What Skribble Offers</h3>

            <div className="flex flex-col">
              <h4 className="font-semibold flex gap-2 items-center text-base">
                <RxDotFilled /> Create, Edit & Preview Notes
              </h4>
              <p className="ml-6">
                Capture your thoughts on the go. Skribble lets you effortlessly
                create, edit, and preview notes in real-time — all in one
                elegant interface.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-semibold flex gap-2 items-center text-base">
                <RxDotFilled /> Markdown Support
              </h4>
              <p className="ml-6">
                Make your notes stand out! Skribble supports Markdown syntax so
                you can format content, highlight ideas, and structure thoughts
                with ease. <br />
                Not familiar with Markdown? <br />
                <span className="flex items-center gap-1 flex-wrap">
                  Just tap the help <IoHelpCircleOutline className="text-lg" />{" "}
                  button to access a beginner-friendly guide packed with
                  examples.
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-semibold flex gap-2 items-center text-base">
                <RxDotFilled /> Light & Dark Modes
              </h4>
              <p className="ml-6">
                Whether you're working in daylight or burning the midnight oil,
                switch between light and dark themes to suit your environment
                and mood.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl">
              Built with Privacy & Performance in Mind
            </h3>

            <div className="flex flex-col gap-1">
              <h4 className="font-semibold flex gap-2 items-center text-base">
                <RxDotFilled /> Secure by Design
              </h4>
              <p className="ml-6">
                Your notes deserve privacy. Skribble’s backend, built with
                Node.js and Express, ensures that your data remains protected
                with modern security practices.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-semibold flex gap-2 items-center text-base">
                <RxDotFilled /> Powered by MongoDB
              </h4>
              <p className="ml-6">
                Store unlimited thoughts! With MongoDB as the database, Skribble
                gives you the space to grow — no matter how many ideas you
                scribble down.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-semibold flex gap-2 items-center text-base">
                <RxDotFilled /> Modern Tech Stack
              </h4>
              <p className="ml-6">
                The app is crafted using React with TypeScript for a fast,
                responsive, and scalable front-end experience.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl">Why Skribble?</h3>
            <p>
              At Skribble, we believe that writing should be joyful, flexible,
              and yours. Whether it's a journal entry, a list of goals, or an
              idea for your next big project — Skribble helps you bring your
              thoughts to life. <br /> Start scribbling your brilliance today —
              with Skribble, it’s more than just notes. It’s your space, your
              words, your way.
            </p>
          </div>

          <div className="font-medium flex flex-col gap-1">
            <p className="flex gap-1 items-center flex-wrap">
              Skribble created using
              <span className="animate-pulse text-xl">
                <FaReact />
              </span>
              by -{" "}
              <a
                className="underline text-base"
                href="https://github.com/suman-saurabh-das"
                target="_blank"
              >
                Suman Saurabh Das
              </a>
            </p>
            <p>Copyright @ 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
