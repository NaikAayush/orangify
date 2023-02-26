import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { auth, storage, storageRef } from "../../lib/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Loader from "../Loader";
import { addCertificate } from "../../lib/wallet-api/wallet";

type MyDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  credType: string;
  credTypeId: string;
  presentToast: any;
};

export default function AddCertificateSlideOver({
  credType,
  credTypeId,
  isOpen,
  onClose,
  presentToast,
}: MyDialogProps) {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [genericFileName, setGenericFileName] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask
        .then((data: any) => {
          console.log("Upload complete!", data);
          getDownloadURL(storageRef)
            .then((url) => {
              addCertificate({
                typeId: credTypeId,
                issuedTo: auth.currentUser?.phoneNumber as string,
                data: {
                  fileURL: url,
                  genericFileName,
                },
                validity: 0,
              }).then((res) => {
                setLoading(false);
                onClose();
                presentToast("Credential added successfully!");
              });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          onClose();
          presentToast("Error adding credential!");
        });
    }
  };

  const onSubmit = () => {
    setLoading(true);
    handleFileUpload();
  };

  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={isOpen}
          onClose={onClose}
        >
          {loading && <Loader />}
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-white">
                              Add Credential
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={onClose}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-indigo-300">
                              Get started by adding information about your
                              credential.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between text-black">
                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div className="space-y-6 pt-6 pb-5">
                              <div>
                                <label
                                  htmlFor="cred-type"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Credential Type
                                </label>
                                <div className="mt-1">
                                  <input
                                    readOnly
                                    disabled
                                    value={credType}
                                    type="text"
                                    name="cred-type"
                                    id="cred-type"
                                    className="block w-full disabled rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
                                  />
                                </div>
                              </div>
                              {credType == "Generic" && (
                                <div>
                                  <label
                                    htmlFor="cred-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Credential name
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      value={genericFileName}
                                      onChange={(e) =>
                                        setGenericFileName(e.target.value)
                                      }
                                      type="text"
                                      name="cred-name"
                                      id="cred-name"
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                              )}
                              <div>
                                <input
                                  type="file"
                                  onChange={handleFileChange}
                                />
                                {file && (
                                  <div>
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt="Preview"
                                    />
                                  </div>
                                )}
                              </div>
                              <fieldset>
                                <legend className="text-sm font-medium text-gray-900">
                                  Type of Credential
                                </legend>
                                <div className="mt-2 space-y-5">
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-5 items-center">
                                      <input
                                        id="privacy-public"
                                        name="privacy"
                                        aria-describedby="privacy-public-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        defaultChecked
                                      />
                                    </div>
                                    <div className="pl-7 text-sm">
                                      <label
                                        htmlFor="privacy-public"
                                        className="font-medium text-gray-900"
                                      >
                                        Work
                                      </label>
                                      <p
                                        id="privacy-public-description"
                                        className="text-gray-500"
                                      >
                                        Work experience, education, etc.
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="relative flex items-start">
                                      <div className="absolute flex h-5 items-center">
                                        <input
                                          id="privacy-private-to-project"
                                          name="privacy"
                                          aria-describedby="privacy-private-to-project-description"
                                          type="radio"
                                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                      </div>
                                      <div className="pl-7 text-sm">
                                        <label
                                          htmlFor="privacy-private-to-project"
                                          className="font-medium text-gray-900"
                                        >
                                          Skill
                                        </label>
                                        <p
                                          id="privacy-private-to-project-description"
                                          className="text-gray-500"
                                        >
                                          Courses, Certifications, etc.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            <div className="pt-4 pb-6">
                              <div className="mt-4 flex text-sm">
                                <a
                                  href="#"
                                  className="group inline-flex items-center text-gray-500 hover:text-gray-900"
                                >
                                  <QuestionMarkCircleIcon
                                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2">
                                    Learn more about uploading your credentials.
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={onSubmit}
                          type="button"
                          className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
