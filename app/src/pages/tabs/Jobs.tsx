import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import JobList from "../../components/JobList";
import { searchWithJobTitle } from "../../lib/api/search";
import { SearchInterface } from "../../models/search";

const Jobs: React.FC = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobList, setJobList] = useState<SearchInterface | null>(null);
  const [jobState, setJobState] = useState<boolean>(false);
  const [parsedJobs, setParsedJobs] = useState<Positions[]>([]);
  const parsedJob: Positions[] = [];

  function onSearch() {
    searchWithJobTitle(jobTitle).then((res) => {
      setJobList(res as SearchInterface);
    });
  }

  useEffect(() => {}, [jobList]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Jobs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row w-full justify-center gap-4">
            <div>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                placeholder="manager"
              />
            </div>
            <button
              onClick={() => {
                onSearch();
              }}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4  text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </div>
          {jobList && <JobList jobList={jobList} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export interface Positions {
  id: string;
  title: string;
  location: string[];
  company: string;
}

export default Jobs;
