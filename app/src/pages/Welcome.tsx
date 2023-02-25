import { IonPage } from "@ionic/react";
import hero from "../assets/welcome/hero.png";

const Welcome: React.FC = () => {
  return (
    <IonPage className="bg-welcome bg-cover bg-center !justify-center px-6 gap-8">
      <img src={hero} alt="" />
      <div>
        <h1 className="text-5xl font-rogerex font-bold m-0 p-0">Simple.</h1>
        <h1 className="text-5xl font-rogerex font-bold m-0 p-0">Secure.</h1>
        <h1 className="text-5xl font-rogerex font-bold m-0 p-0">Seamless.</h1>
        <h5 className="font-inter text-Base/40">
          Transform your digital credential management with Orangify.
        </h5>
      </div>

      <button
        type="button"
        className="p-10 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
        <p className="font-inter font-semibold text-Base/100">
          Continue with Phone
        </p>
      </button>
    </IonPage>
  );
};

export default Welcome;
