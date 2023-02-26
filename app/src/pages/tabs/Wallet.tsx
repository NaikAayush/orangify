import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import DiscoverWallet from "./wallet/DiscoverWallet";
import MyWallet from "./wallet/MyWallet";
import { useState } from "react";

const Wallet: React.FC = () => {
  const [segmentValue, setSegmentValue] = useState("discover");

  function renderSwitch() {
    switch (segmentValue) {
      case "discover":
        return <DiscoverWallet />;
      case "mywallet":
        return <MyWallet />;
      default:
        return <DiscoverWallet />;
    }
  }

  function handleSegment(event: any) {
    setSegmentValue(event.detail.value);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSegment value={segmentValue} onIonChange={handleSegment}>
          <IonSegmentButton value="discover">
            <IonLabel>Discover</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="mywallet">
            <IonLabel>My Wallet</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {renderSwitch()}
      </IonContent>
    </IonPage>
  );
};

export default Wallet;
