import { ethers } from "hardhat";
import { Event } from "ethers";

async function main() {
    let contract = await ethers.getContractFactory("OrangeVerifiedCredential");
    let deployed = contract.attach("0x0165878A594ca255338adfa4d48449f69242Eb8F");
    let res = await deployed.addCertificateType(
        "Generic",
        JSON.stringify({ "iconUrl": "https://www.google.com/favicon.ico" }),
        {
            // value: ethers.utils.parseEther("0.00004"),
            // gasPrice: 8000000000,
            // gasLimit: 4200000
        }
    );
    let waited = await res.wait();
    let certTypeId = (waited.events)[0].args.id;
    // console.log(res);
    console.log(await deployed.getAllCertificateTypes());

    res = await deployed.addCertificate(certTypeId, "Person1", JSON.stringify({
        "type": "Skill",
        "certificateId": "123",
        "issuer": "ABC Organization",
        "issuedOn": "2022-01-01",
        "signedDate": "2022-01-02",
        "validFrom": "2022-01-03",
        "validUntil": "2022-12-31",
        "name": "John Smith",
        "mobile": "+1 123-456-7890",
        "email": "john.smith@example.com",
        "skills": [
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js"
        ]
    }
    ), 0);
    waited = await res.wait();
    let certId = waited.events[0].args.certificateId;
    await deployed.getAllCertificatesOfType(certTypeId);
    await deployed.getCertificate(certId);

    await deployed.verifyCertificate(certId);

    res = await deployed.addCertificate(certTypeId, "Person1", JSON.stringify(
        {
            "type": "Work",
            "certificateId": "456",
            "issuer": "XYZ Organization",
            "issuedOn": "2022-01-01",
            "signedDate": "2022-01-02",
            "validFrom": "2022-01-03",
            "validUntil": "2022-12-31",
            "name": "Jane Doe",
            "mobile": "+1 123-456-7890",
            "email": "jane.doe@example.com",
            "workExp": {
                "issuer": "XYZ Organization",
                "address": "123 Main St, Anytown, USA",
                "issuedOn": "2022-01-01",
                "worksAs": {
                    "roleType": "full-time",
                    "jobTitle": "Software Engineer",
                    "startDate": "2020-01-01",
                    "endDate": "2022-01-01",
                    "occupationalIndustry": "Software Development",
                    "occupationalCategory": "Computer Science"
                },
                "workLocation": {
                    "address": "123 Main St, Anytown, USA",
                    "geo": null
                }
            }
        }

    ), 0);
    waited = await res.wait();
    certId = waited.events[0].args.certificateId;
    await deployed.getAllCertificatesOfType(certTypeId);
    await deployed.getCertificate(certId);

    await deployed.verifyCertificate(certId);
    await deployed.getCertificate(certId); await deployed.getCertificate(certId);
    // console.log(res);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
