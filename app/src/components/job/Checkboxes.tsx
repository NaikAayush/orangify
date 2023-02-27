import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { MyCertificate } from "../../models/wallet";

export default function Checkboxes({
  myCertificateList,
}: {
  myCertificateList: MyCertificate[];
}) {
  return (
    <fieldset className="space-y-5">
      {myCertificateList.map((certificate) => (
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex h-5 items-center ">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-lg">
              <label htmlFor="comments" className="font-medium text-gray-700">
                {certificate.type_.name}
              </label>
            </div>
          </div>
          {certificate.verified && (
            <CheckBadgeIcon
              className="h-8 w-8 flex-shrink-0 text-green-400"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </fieldset>
  );
}
