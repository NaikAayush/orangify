import { useEffect, useState } from "react";
import { eth } from "../_app";
import Link from "next/link";

const List = () => {
  const [certTypes, setCertTypes] = useState<any[]>([]);

  useEffect(() => {
    const getCertTypes = async () => {
      const types = await eth.getAllCertificateTypes();
      setCertTypes(types);

      console.log("certTypes in List", certTypes);
    };

    getCertTypes();
  }, []);

  return (
    // <div>
    //   <ul>
    //     {certTypes.map((certType) => (
    //       <li key={certType.id}>{certType.name}</li>
    //     ))}
    //   </ul>
    // </div>

    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">
          Your Credential Types
        </h1>
        <Link href="/new">
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            New Certificate Type
          </button>
        </Link>
      </div>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {certTypes.map((certificateType) => (
            <li key={certificateType.id}>
              <Link
                href={`/type/${certificateType.id}`}
                className="block hover:bg-gray-50"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-lg object-contain"
                        src={certificateType.metadata.iconUrl}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-lg font-medium text-black">
                          {certificateType.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*<div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>*/}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
