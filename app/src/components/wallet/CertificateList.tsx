import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { CertificateType } from "../../models/wallet";
import AddCertificateSlideOver from "./AddCertificateSlideOver";
import { useState } from "react";
import { IonButton, useIonToast } from "@ionic/react";

export default function CertificateList({
  certificateTypeList,
}: {
  certificateTypeList: CertificateType[];
}) {
  const [certType, setCertType] = useState(null);
  const [credTypeId, setCredTypeId] = useState(null);
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [present] = useIonToast();

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
    });
  };

  const handleFormSubmit = (certType: any, certTypeId: any) => {
    setCertType(certType);
    setCredTypeId(certTypeId);
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setShowNewComponent(true);
  };

  const handleCloseDialog = () => {
    setShowNewComponent(false);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      {showNewComponent && certType && credTypeId && (
        <AddCertificateSlideOver
          credType={certType}
          credTypeId={credTypeId}
          isOpen={showNewComponent}
          onClose={() => {
            handleCloseDialog();
          }}
          presentToast={presentToast}
        />
      )}

      <ul role="list" className="divide-y divide-gray-200">
        {certificateTypeList.map((certificateType) => (
          <li key={certificateType.id}>
            <a
              onClick={() => {
                handleFormSubmit(certificateType.name, certificateType.id);
              }}
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
