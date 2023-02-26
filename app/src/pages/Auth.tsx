import { IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import Button from "../components/Button";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { auth } from "../lib/firebase";
import Loader from "../components/Loader";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

const Auth: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("9876543212");
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const history = useHistory();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log(response);
            requestOTP();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onOTPVerify() {
    console.log(otp);
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        history.push("/tabs");
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }

  function requestOTP() {
    setLoading(true);
    setOtp("");
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPhoneNumber = "+91" + phoneNumber;

    signInWithPhoneNumber(auth, formatPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        // toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <IonPage className="bg-welcome bg-cover bg-center !justify-start px-6 gap-8">
      {loading && <Loader />}
      <button className="mt-8" onClick={() => history.goBack()}>
        <ArrowLeftIcon className="h-6 w-6" />
      </button>
      <div>
        <h1 className="text-3xl font-rogerex font-bold m-0 p-0">
          Enter your phone
        </h1>

        <h5 className="font-inter text-white">
          You will receive a 6 digit code for your phone number verification.
        </h5>
      </div>

      <div className="mt-1">
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            setShowOTP(false), setPhoneNumber(e.target.value);
          }}
          className="px-6 py-3 block w-full rounded-xl border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 text-lg text-black"
          placeholder="Mobile Number"
        />
      </div>

      {showOTP && (
        <div className="mt-1">
          <input
            type="text"
            name="otp"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-6 py-3 block w-full rounded-xl border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 text-lg text-black"
            placeholder="OTP"
          />
        </div>
      )}

      {!showOTP && (
        <Button
          text="Generate OTP"
          onClick={() => {
            requestOTP();
          }}
          rightIcon={<ArrowRightIcon className="h-6 w-6" />}
        ></Button>
      )}

      {showOTP && (
        <Button
          text="Submit"
          onClick={() => {
            onOTPVerify();
          }}
          rightIcon={<ArrowRightIcon className="h-6 w-6" />}
        ></Button>
      )}
      <div id="recaptcha-container"></div>
    </IonPage>
  );
};

export default Auth;
