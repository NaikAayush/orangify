import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";
import { IonCard, IonItem, IonRouterLink } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { SearchInterface } from "../models/search";
import { Positions } from "../pages/tabs/Jobs";

// const positions = [
//   {
//     id: 1,
//     title: "Back End Developer",
//     type: "Full-time",
//     location: "Remote",
//     department: "Engineering",
//     closeDate: "2020-01-07",
//     closeDateFull: "January 7, 2020",
//   },
//   {
//     id: 2,
//     title: "Front End Developer",
//     type: "Full-time",
//     location: "Remote",
//     department: "Engineering",
//     closeDate: "2020-01-07",
//     closeDateFull: "January 7, 2020",
//   },
//   {
//     id: 3,
//     title: "User Interface Designer",
//     type: "Full-time",
//     location: "Remote",
//     department: "Design",
//     closeDate: "2020-01-14",
//     closeDateFull: "January 14, 2020",
//   },
// ];

type JobListProps = {
  jobList: SearchInterface;
};

export default function JobList({ jobList }: JobListProps): JSX.Element {
  const job = jobList?.responses[0]?.message.catalog.providers[0];
  const positions: Positions[] = [];
  job?.items.forEach((item: any) => {
    positions.push({
      id: item?.id,
      title: item?.descriptor.name,
      location: item?.location_ids,
      company: job?.descriptor.name,
    });
  });

  console.log(positions);
  const history = useHistory();
  return (
    <div>
      {positions?.length > 0 && (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {positions?.map((position) => (
              <li key={position.id}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/tabs/jobs/" + position.id);
                  }}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-indigo-600">
                        {position.title}
                      </p>
                      <div className="ml-2 flex flex-shrink-0">
                        <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {position.company}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        {/* <p className="flex items-center text-sm text-gray-500">
                          <UsersIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {position.id}
                        </p> */}
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <MapPinIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {position.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
