import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import CertificateList from "../../../components/wallet/CertificateList";
import { getAllCertificateTypes } from "../../../lib/wallet-api/wallet";
import { CertificateType } from "../../../models/wallet";

const DiscoverWallet: React.FC = () => {
  const [certificateTypes, setCertificateTypes] = useState<CertificateType[]>();

  useEffect(() => {
    getAllCertificateTypes().then((res) => {
      setCertificateTypes(res);
    });
  }, []);

  return (
    <div>
      {certificateTypes ? (
        certificateTypes.length ? (
          <CertificateList certificateTypeList={certificateTypes} />
        ) : (
          "No certificates found"
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DiscoverWallet;
