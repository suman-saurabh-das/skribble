// icons
import { ImSpinner2 } from "react-icons/im";
// types
import type { LoaderProps } from "../../utils/types";

const Loader = ({ size = "text-xl" }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <ImSpinner2 className={`animate-spin ${size}`} />
    </div>
  );
};
export default Loader;
