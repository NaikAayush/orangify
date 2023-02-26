import { useEffect, useState } from "react";
import CertificateList from "../../../components/wallet/CertificateList";
import { getAllCertificateTypes } from "../../../lib/wallet-api/wallet";
import { CertificateType } from "../../../models/wallet";

const DiscoverWallet: React.FC = () => {
  const [certificateTypes, setCertificateTypes] = useState<CertificateType[]>(
    []
  );

  useEffect(() => {
    getAllCertificateTypes().then((res) => {
      setCertificateTypes(res);
    });
  }, []);

  return (
    <div>
      {certificateTypes.length ? (
        <CertificateList certificateTypeList={certificateTypes} />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default DiscoverWallet;
