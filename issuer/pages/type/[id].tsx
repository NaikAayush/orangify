import { useRouter } from "next/router";
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { CertificateMeta } from "../../lib/eth";
import { eth } from "../_app";
import Header from "../../components/header";

const Type = () => {
  const router = useRouter();
  const { id } = router.query;
  // console.log(router.query);
  const certTypeId = parseInt(id?.toString()!);
  console.log("got certTypeId", certTypeId);

  const [updated, setUpdated] = useState(0);

  // const [certTypes, setCertTypes] = useState<CertificateMetaType[]>([]);
  // useEffect(() => {
  //   const getCertTypes = async () => {
  //     const types = await eth.getAllCertificateTypes();
  //     setCertTypes(types);
  //     console.log("certTypes in type page", certTypes);
  //   };

  //   getCertTypes();
  // }, [updated]);

  const [unverifiedCerts, setUnverifiedCerts] = useState<CertificateMeta[]>([]);
  const [verifiedCerts, setVerifiedCerts] = useState<CertificateMeta[]>([]);
  useEffect(() => {
    const getCerts = async () => {
      const certs = await eth.getAllCertificateOfType(certTypeId);
      const unverCerts = certs.filter((cert) => !cert.verified);
      const verCerts = certs.filter((cert) => cert.verified);
      setUnverifiedCerts(unverCerts);
      setVerifiedCerts(verCerts);
      console.log("unverifiedCerts", unverifiedCerts);
      console.log("verifiedCerts", verifiedCerts);
    };

    getCerts();
  }, [updated]);

  async function verifyCert(certId: number) {
    await eth.verifyCertificate(certId);
    setUpdated(updated + 1);
  }

  return (
    <div className="p-10">
      <div>
        <Header />
      </div>
      <div className="mt-10">
        <div>
          <div>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Unverified Certificates
              </h3>
            </div>
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {unverifiedCerts.map((certificate) => (
                  <li key={certificate.id.toString()}>
                    <a className="block hover:bg-gray-50">
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="flex min-w-0 flex-1 items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-lg object-contain"
                              src={certificate.type_.metadata.iconUrl}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1 flex-row px-4">
                            <div className="truncate text-lg font-medium text-black">
                              {certificate.type_.name}
                            </div>
                            <div className="mt-4">
                              <span className="font-medium text-gray-600">
                                Issued to:
                              </span>{" "}
                              {certificate.issuedTo}
                            </div>
                            <div className="mt-2">
                              <span className="font-medium text-gray-600">
                                Valid until:
                              </span>{" "}
                              {certificate.validity.toString() == "0"
                                ? new Date(
                                    Number(certificate.createdAt) +
                                      Number(certificate.validity)
                                  ).toLocaleDateString()
                                : "Forever"}
                            </div>
                          </div>
                        </div>
                        <div>
                          <ShieldExclamationIcon className="h-8 w-8 flex-shrink-0 text-red-400" />
                        </div>
                        <div>
                          <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => verifyCert(Number(certificate.id))}
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Verified Certificates
              </h3>
            </div>
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {verifiedCerts.map((certificate) => (
                  <li key={certificate.id.toString()}>
                    <a className="block hover:bg-gray-50">
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="flex min-w-0 flex-1 items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-lg object-contain"
                              src={certificate.type_.metadata.iconUrl}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1 flex-row px-4">
                            <div className="truncate text-lg font-medium text-black">
                              {certificate.type_.name}
                            </div>
                            <div className="mt-4">
                              <span className="font-medium text-gray-600">
                                Issued to:
                              </span>{" "}
                              {certificate.issuedTo}
                            </div>
                            <div className="mt-2">
                              <span className="font-medium text-gray-600">
                                Valid until:
                              </span>{" "}
                              {certificate.validity.toString() == "0"
                                ? new Date(
                                    Number(certificate.createdAt) +
                                      Number(certificate.validity)
                                  ).toLocaleDateString()
                                : "Forever"}
                            </div>
                          </div>
                        </div>
                        <div>
                          <ShieldCheckIcon className="h-8 w-8 flex-shrink-0 text-green-400" />
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Type.getInitialProps = async () => {
  return {};
};

export default Type;
