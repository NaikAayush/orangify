import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { MyCertificate } from "../../models/wallet";

export default function MyCertificateList({
  myCertificateList,
}: {
  myCertificateList: MyCertificate[];
}) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {myCertificateList.map((certificate) => (
          <li key={certificate.id}>
            <a href="" className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-lg object-contain"
                      src="{aadhaar}"
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-lg font-medium text-black">
                        {certificate.type_.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  {certificate.verified && (
                    <CheckBadgeIcon
                      className="h-8 w-8 flex-shrink-0 text-green-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
