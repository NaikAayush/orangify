import { Redirect, Route } from "react-router-dom";
import {
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { cog, wallet, newspaper } from "ionicons/icons";

import Jobs from "./tabs/Jobs";
import Settings from "./tabs/Settings";
import Wallet from "./tabs/Wallet";
import Job from "../components/Job";
import Certificate from "../components/wallet/Certificate";

const Tabs: React.FC = () => {
  return (
    <IonContent>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/tabs" to="/tabs/jobs" />
          <Route exact path="/tabs/jobs">
            <Jobs />
          </Route>
          <Route exact path="/tabs/jobs/:jobId">
            <Job />
          </Route>
          <Route exact path="/tabs/wallet">
            <Wallet />
          </Route>
          <Route path="/tabs/settings">
            <Settings />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="jobs" href="/tabs/jobs">
            <IonIcon icon={newspaper} />
            <IonLabel>Jobs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="wallet" href="/tabs/wallet">
            <IonIcon icon={wallet} />
            <IonLabel>Wallet</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/tabs/settings">
            <IonIcon icon={cog} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  );
};

const JobRouterOutlet: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/tabs/jobs" exact={true}>
      <Jobs />
    </Route>
    <Route path="/tabs/jobs/job" exact={true}>
      <Job />
    </Route>
  </IonRouterOutlet>
);

export default Tabs;
