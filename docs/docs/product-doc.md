---
sidebar_position: 6
---

# Product Document

## Abstract

### Problem Statement

Paper-based certificates are currently used to apply for jobs, given out in certifications, courses and universities. When an application is received, the organizations cannot implicitly trust the certificates since they can be forged and once the candidates are selected, they need to reach out to the universities, training institutes or NGOs to manually verify them.

There are existing digital certificates solutions such as Digilocker or Coursera Online Certificates, but they are either centralized or very specific to one organization. It is still difficult for organizations to create and verify their own certificates and since they are stored centrally, it cannot be guaranteed that they will not be tampered with.

In summary, there is a lack of trust and authority in current certification systems.

### Solution

Our solution, Orangify, is a platform for **decentralized credential verification**, storage, and issuance.

Orangify is designed to provide a seamless and secure way for individuals and organizations to manage their digital credentials, such as **academic certificates**, **professional licenses**, and other important documents.

Orangify leverages the power of private blockchain technology (Hyperledger Besu) to augment the existing Beckn [DSEP APIs](https://github.com/beckn/DSEP-Specification), making it easier for users to verify their credentials and for organizations to issue and store them securely. This means that certificates are issued directly by the organizations themselves and cannot be forged, ensuring the authenticity of the credentials.

### Target audience - features and workflow

(Click on the links below to see the features and user workflow for each user)

- [End users](for-users.md) looking to have their certificates - work experience, courses, etc. - in one place to easily apply for opportunities.
- [Issuer Organizations](for-issuers.md) such as corporates, NGOs, training institutes and universities looking to distribute verified certificates digitally. It prevents forgery and builds trust for the brand.
- [Hiring Organizations](for-hirers.md) looking to streamline their hiring process to quickly identify legit candidates with good credentials.

## Tech stack

Orangify makes use of the following technologies:

- [**Hyperledger Besu**](https://www.hyperledger.org/use/besu): permissioned enterprise-grade EVM-based blockchain.
- [**Nest.js**](https://nestjs.com/): backend framework used in the Wallet API and BPP implementations.
- [**Next.js**](https://nextjs.org/): the frontend framework used in the mobile app (web portion), issuer UI and BPP UI.
- [**Ionic**](https://ionicframework.com/): for the mobile app.
- **Solidity**: the Orange Verified Credentials smart contract is written in Solidity v0.8.
- **Ethers.js**: for communication with the blockchain.
- **Typescript**: for the entire codebase.
