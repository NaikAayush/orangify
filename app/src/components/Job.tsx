import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import { selectJob } from "../lib/api/select";
import { useEffect, useState } from "react";
import { Order, SelectInterface } from "../models/select";
import LocationTypeBadges from "./job/LocationTypeBadges";
import Loader from "./Loader";
import ApplyJobModal from "./job/ApplyJobModal";

interface ParamTypes {
  jobId: string;
}

export default function Job() {
  const { jobId } = useParams<ParamTypes>();
  console.log(jobId);

  const [jobInfo, setJobInfo] = useState<SelectInterface | null>(null);
  const [jobOrder, setJoborder] = useState<Order | null>(null);
  const [jobDescriptionTruncated, setJobDescriptionTruncated] = useState(true);
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [present] = useIonToast();

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
    });
  };

  const handleOpenDialog = () => {
    setShowNewComponent(true);
  };

  const handleCloseDialog = () => {
    setShowNewComponent(false);
  };

  useEffect(() => {
    selectJob(jobId).then((res) => {
      setJobInfo(res as SelectInterface);
      setJoborder(res.responses[0].message.order);
    });
  }, []);

  function renderJobInfo() {
    return jobInfo && jobOrder ? (
      <div className="p-4">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {jobOrder.items[0].descriptor.name}
          </h3>
          <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <span
              className={`"mt-1 max-w-2xl text-sm text-gray-500 ${
                jobDescriptionTruncated ? "truncate" : ""
              }`}
            >
              {jobOrder.items[0].descriptor.long_desc}
            </span>
            <span className="ml-4 flex-shrink-0">
              {jobDescriptionTruncated ? (
                <button
                  onClick={() =>
                    setJobDescriptionTruncated(!jobDescriptionTruncated)
                  }
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Show More
                </button>
              ) : (
                <button
                  onClick={() =>
                    setJobDescriptionTruncated(!jobDescriptionTruncated)
                  }
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Show Less
                </button>
              )}
            </span>
          </dd>
        </div>
        <div className="mt-5 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Provider</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {jobOrder.provider.descriptor.name}
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">
                Location Type
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 gap-2">
                {jobOrder?.provider.fulfillments.map((object, i) => (
                  <LocationTypeBadges type={object.type} key={i} />
                ))}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Locations</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 gap-2">
                {jobOrder?.provider.locations.map((object, i) => (
                  <LocationTypeBadges type={object.city.name} key={i} />
                ))}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <button
                onClick={handleOpenDialog}
                type="button"
                className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Apply
              </button>
              <ApplyJobModal
                isOpen={showNewComponent}
                onClose={() => {
                  handleCloseDialog();
                }}
                presentToast={presentToast}
              />
            </div>

            {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 w-0 flex-1 truncate">
                        resume_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Update
                      </button>
                      <span className="text-gray-300" aria-hidden="true">
                        |
                      </span>
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 w-0 flex-1 truncate">
                        coverletter_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Update
                      </button>
                      <span className="text-gray-300" aria-hidden="true">
                        |
                      </span>
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                </ul>
              </dd>
            </div> */}
          </dl>
        </div>
      </div>
    ) : (
      <Loader />
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/jobs" />
          </IonButtons>
          <IonTitle>Job</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{renderJobInfo()}</IonContent>
    </IonPage>
  );
}
