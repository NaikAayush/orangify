import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { CertificateType } from "../../models/wallet";
import aadhaar from "../../assets/aadhaar.png";

export default function CertificateList({
  certificateTypeList,
}: {
  certificateTypeList: CertificateType[];
}) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {certificateTypeList.map((certificateType) => (
          <li key={certificateType.id}>
            <a href="" className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-lg object-contain"
                      src={aadhaar}
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
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
