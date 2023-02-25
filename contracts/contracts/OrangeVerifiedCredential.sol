// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract OrangeVerifiedCredential {
    struct CertificateType {
        bool _isInit;
        uint256 id;
        string name;
        uint256 createdAt;
        bool deleted;
        address owner;
    }

    CertificateType[] certificateTypes;

    struct Certificate {
        bool _isInit;
        uint256 id;
        CertificateType type_;
        string issuedTo;
        string data;
        uint256 createdAt;
        // 0 means no expiry.
        uint256 validity;
        bool verified;
        bool revoked;
    }

    Certificate[] certificates;

    // CertificateTypeID => CertificateID[]
    mapping(uint256 => uint256[]) certificatesWithType;

    event CertificateTypeAdded(uint256 id, string name, address indexed owner);
    event CertificateTypeDeleted(uint256 id);
    event CertificateAdded(
        uint256 indexed typeId,
        uint256 indexed certificateId,
        string issuedTo,
        string data,
        address indexed owner
    );
    event CertificateVerified(
        uint256 indexed typeId,
        uint256 indexed certificateId,
        address indexed verifier
    );
    event CertificateRevoked(
        uint256 indexed typeId,
        uint256 indexed certificateId,
        address indexed revoker
    );

    // addCertificateType: Create a new certificate type.
    function addCertificateType(string memory _name) public returns (uint256) {
        require(bytes(_name).length > 0, "Name must not be empty");
        uint256 id = certificateTypes.length;
        certificateTypes.push(
            CertificateType(true, id, _name, block.timestamp, false, msg.sender)
        );
        emit CertificateTypeAdded(id, _name, msg.sender);
        return id;
    }

    // deleteCertificateType: Mark a certificate type as deleted.
    function deleteCertificateType(uint256 _typeId) public {
        require(
            _typeId < certificateTypes.length,
            "Invalid certificate type ID"
        );
        CertificateType storage certType = certificateTypes[_typeId];
        require(
            msg.sender == certType.owner,
            "Only the certificate type owner can delete it"
        );
        certType.deleted = true;
        emit CertificateTypeDeleted(_typeId);
    }

    function getAllCertificateTypes()
        public
        view
        returns (CertificateType[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < certificateTypes.length; i++) {
            if (certificateTypes[i]._isInit && !certificateTypes[i].deleted) {
                count++;
            }
        }
        CertificateType[] memory result = new CertificateType[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < certificateTypes.length; i++) {
            if (certificateTypes[i]._isInit && !certificateTypes[i].deleted) {
                result[index] = certificateTypes[i];
                index++;
            }
        }
        return result;
    }

    // Get all certificate types (of msg.sender)
    function getMyCertificateTypes()
        public
        view
        returns (CertificateType[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < certificateTypes.length; i++) {
            if (
                certificateTypes[i]._isInit &&
                certificateTypes[i].owner == msg.sender
            ) {
                count++;
            }
        }
        CertificateType[] memory result = new CertificateType[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < certificateTypes.length; i++) {
            if (
                certificateTypes[i]._isInit &&
                certificateTypes[i].owner == msg.sender
            ) {
                result[index] = certificateTypes[i];
                index++;
            }
        }
        return result;
    }

    // addCertificate: Create a new certificate of a certain type.
    function addCertificate(
        uint256 _typeId,
        string memory issuedTo,
        string memory _data,
        uint256 _validity
    ) public returns (uint256) {
        require(
            _typeId < certificateTypes.length,
            "Invalid certificate type ID"
        );
        require(
            certificateTypes[_typeId]._isInit &&
                !certificateTypes[_typeId].deleted,
            "Certificate type is not initialized or has been deleted"
        );
        CertificateType storage certType = certificateTypes[_typeId];
        // require(
        //     msg.sender == certType.owner,
        //     "Only the certificate type owner can add certificates of this type"
        // );
        require(!certType.deleted, "Certificate type is deleted");
        require(bytes(_data).length > 0, "Data must not be empty");
        uint256 id = certificates.length;
        certificates.push(
            Certificate(
                true,
                id,
                certType,
                issuedTo,
                _data,
                block.timestamp,
                _validity,
                false,
                false
            )
        );
        certificatesWithType[_typeId].push(id);
        emit CertificateAdded(_typeId, id, issuedTo, _data, msg.sender);
        return id;
    }

    function verifyCertificate(uint256 _certificateId) public {
        require(_certificateId < certificates.length, "Invalid certificate ID");
        Certificate storage certificate = certificates[_certificateId];
        require(
            certificate._isInit && !certificate.revoked,
            "Certificate does not exist or was revoked"
        );
        require(
            msg.sender == certificate.type_.owner,
            "Only the certificate type owner can verify certificates of this type"
        );

        certificate.verified = true;

        emit CertificateVerified(
            certificate.type_.id,
            _certificateId,
            msg.sender
        );
    }

    // revokeCertificate: Revoke a certificate.
    function revokeCertificate(uint256 _certificateId) public {
        require(_certificateId < certificates.length, "Invalid certificate ID");
        Certificate storage certificate = certificates[_certificateId];
        require(
            msg.sender == certificate.type_.owner,
            "Only the certificate type owner can revoke certificates of this type"
        );
        certificate.revoked = true;
        emit CertificateRevoked(
            certificate.type_.id,
            _certificateId,
            msg.sender
        );
    }

    function getAllCertificatesOfType(
        uint256 _typeId
    ) public view returns (Certificate[] memory) {
        require(
            _typeId < certificateTypes.length,
            "Invalid certificate type ID"
        );
        require(
            certificateTypes[_typeId]._isInit &&
                !certificateTypes[_typeId].deleted,
            "Certificate type is not initialized or has been deleted"
        );
        uint256[] memory certificateIds = certificatesWithType[_typeId];
        uint256 count = 0;
        for (uint256 i = 0; i < certificateIds.length; i++) {
            uint256 certificateId = certificateIds[i];
            if (
                certificates[certificateId]._isInit &&
                !certificates[certificateId].revoked
            ) {
                count++;
            }
        }
        Certificate[] memory result = new Certificate[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < certificateIds.length; i++) {
            uint256 certificateId = certificateIds[i];
            if (
                certificates[certificateId]._isInit &&
                !certificates[certificateId].revoked
            ) {
                result[index] = certificates[certificateId];
                index++;
            }
        }
        return result;
    }
}
