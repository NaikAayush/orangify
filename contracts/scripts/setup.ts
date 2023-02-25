import { ethers } from "hardhat";
import { Event } from "ethers";

async function main() {
    let contract = await ethers.getContractFactory("OrangeVerifiedCredential");
    let deployed = contract.attach("0x0165878A594ca255338adfa4d48449f69242Eb8F");
    let res = await deployed.addCertificateType(
        "10thMarksCard",
        {
            // value: ethers.utils.parseEther("0.00004"),
            // gasPrice: 8000000000,
            // gasLimit: 4200000
        }
    );
    let waited = await res.wait();
    let certTypeId = (waited.events)[0].args.id;
    // console.log(res);
    await deployed.getAllCertificateTypes();

    res = await deployed.addCertificate(certTypeId, "Person1", "{\"number\": 12345}", 3600 * 1000);
    waited = await res.wait();
    let certId = waited.events[0].args.certificateId;
    await deployed.getAllCertificatesOfType(certTypeId);
    await deployed.getCertificate(certId);

    await deployed.verifyCertificate(certId);
    await deployed.getCertificate(certId);
    // console.log(res);
}