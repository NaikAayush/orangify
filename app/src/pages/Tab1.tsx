import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import ExploreContainer from "../components/ExploreContainer";
import Toggle from "../components/Toggle";
import { auth } from "../lib/firebase";
import PhoneAuthForm, { PhoneFormReturn } from "./Auth";
import "./Tab1.css";

declare global {
  interface Window {
    confirmationResult: any;
  }
}

const Tab1: React.FC = () => {
  const [errorMsg, setErrorMsg] = React.useState("");
  const [phoneErrorMsg, setPhoneErrorMsg] = React.useState("");

  const submitPhone = ({ phoneNumber, recaptchaVerifier }: PhoneFormReturn) => {
    auth
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("confirmation not sent", error.message);
      });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 200</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PhoneAuthForm />
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Toggle />
        <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
