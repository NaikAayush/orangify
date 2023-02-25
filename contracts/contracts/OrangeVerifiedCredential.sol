// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract OrangeVerifiedCredential {
    // schema: https://github.com/VC-Specs/vc-specs/blob/d1d227edad9a313d96ab3619c0b206efa610786f/common/CertificateBase.json#L6
    struct CertificateBase {
        string certificateId;
        string issuer;
        uint256 issuedOn;
        uint256 signedDate;
        uint256 validFrom;
        uint256 validUntil;
    }

    // schema: https://github.com/VC-Specs/vc-specs/blob/d1d227edad9a313d96ab3619c0b206efa610786f/common/CertificateBase.json#L32
    struct Subject {
        string name;
        string mobile;
        string email;
    }

    // schema: https://github.com/VC-Specs/vc-specs/blob/d1d227edad9a313d96ab3619c0b206efa610786f/common/schema.org.json#L6
    struct DefinedTerm {
        string termCode;
        string name;
        string description;
        string image;
        string url;
        string subjectOf;
    }

    // schema: https://github.com/VC-Specs/vc-specs/blob/d1d227edad9a313d96ab3619c0b206efa610786f/skill/skill.json#L14
    struct SkillCertificate {
        CertificateBase base;
        Subject subject;
        string[] stringSkills;
        DefinedTerm[] termSkills;
    }

    // schema: https://github.com/VC-Specs/vc-specs/blob/d1d227edad9a313d96ab3619c0b206efa610786f/common/Common.json#L5
    struct Address {
        string plot;
        string street;
        string landmark;
        string locality;
        string state;
        string district;
        string village;
        string pincode;
    }

    // // schema: https://github.com/VC-Specs/vc-specs/blob/d1d227edad9a313d96ab3619c0b206efa610786f/work/powex.jsonld#L9
    // struct ProofOfWorkExperience {
    //     string issuer;
    //     string legalName;
    //     Address address_;
    //     uint256 issuedOn;
    //     Subject credentialSubject;
    //     string lastJobTitle;
    //     string worksFor;
    //     OccupationalRole worksAs;
    //     WorkLocation workLocation;
    // }

    // // schema: https://github.com/VC-Specs/vc-specs/blob/d1d227edad9a313d96ab3619c0b206efa610786f/work/powex.jsonld#L38
    // struct PrivateProofOfWorkExperience {
    //     string issuer;
    //     uint256 issuedOn;
    // }
    struct ProofOfWorkExperience {
        address issuer;
        string legalName;
        Address address_;
        uint256 issuedOn;
        Subject credentialSubject;
        string lastJobTitle;
        Organization worksFor;
        OccupationalRole worksAs;
        WorkLocation workLocation;
        bytes proof;
    }

    struct PrivateProofOfWorkExperience {
        address issuer;
        uint256 issuedOn;
        string isPartOf;
        RoleCompensation roleCompensation;
        RolePerformance rolePerformance;
        AggregateRating rating;
        bytes proof;
    }

    struct OccupationalRole {
        string roleType;
        string jobTitle;
        uint256 startDate;
        uint256 endDate;
        string occupationalIndustry;
        string occupationalCategory;
    }

    struct WorkLocation {
        Address address_;
        string geo;
    }

    struct RoleCompensation {
        NumericRange monthlySalaryRange;
        string salaryCurrency;
    }

    struct RolePerformance {
        uint256 ratingCount;
        uint256 ratingValue;
        uint256 bestPossibleRating;
        uint256 worstPossibleRating;
        string author;
    }

    enum CertificateType {
        Attendance,
        Skill,
        Work,
        Reputation
    }

    // schema: https://github.com/VC-Specs/vc-specs/blob/d1d227edad9a313d96ab3619c0b206efa610786f/certificate.json
    struct Certificate {
        string fullName;
        string grades;
        CertificateType certificateType;
        string mobile;
        string email;
        string course;
        string skill;
        uint256 awardedOn;
    }
}
