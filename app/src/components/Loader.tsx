import Lottie from "lottie-react";
import loader from "../assets/loader.json";

const Loader: React.FC = () => (
  <div
    className="absolute z-30"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>

    <div className="fixed inset-0 z-30 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
        <Lottie animationData={loader} loop={true} />
      </div>
    </div>
  </div>
);

export default Loader;
