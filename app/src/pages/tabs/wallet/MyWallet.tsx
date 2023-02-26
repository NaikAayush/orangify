import { useEffect, useState } from "react";
import MyCertificateList from "../../../components/wallet/MyCertificateList";
import { getMyCertificates } from "../../../lib/wallet-api/wallet";
import { MyCertificate } from "../../../models/wallet";

const MyWallet: React.FC = () => {
  const [myCertificates, setMyCertificates] = useState<MyCertificate[]>([]);

  useEffect(() => {
    getMyCertificates().then((res) => {
      setMyCertificates(res);
    });
  }, []);

  return (
    <div>
      {myCertificates.length ? (
        <MyCertificateList myCertificateList={myCertificates} />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default MyWallet;
