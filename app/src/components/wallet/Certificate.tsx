const Certificate = ({ certificate }: { certificate: any }) => {
  const {
    typeId,
    issuedTo,
    data: {
      type,
      certificateId,
      issuer,
      issuedOn,
      signedDate,
      validFrom,
      validUntil,
      name,
      mobile,
      email,
      workExp: {
        issuer: workExpIssuer,
        address,
        issuedOn: workExpIssuedOn,
        worksAs: {
          roleType,
          jobTitle,
          startDate,
          endDate,
          occupationalIndustry,
          occupationalCategory,
        },
        workLocation: { address: workLocationAddress, geo },
      },
    },
    validity,
  } = certificate;

  return (
    <div>
      <p>typeId: {typeId}</p>
      <p>issuedTo: {issuedTo}</p>
      <p>type: {type}</p>
      <p>certificateId: {certificateId}</p>
      <p>issuer: {issuer}</p>
      <p>issuedOn: {issuedOn}</p>
      <p>signedDate: {signedDate}</p>
      <p>validFrom: {validFrom}</p>
      <p>validUntil: {validUntil}</p>
      <p>name: {name}</p>
      <p>mobile: {mobile}</p>
      <p>email: {email}</p>
      <p>workExp issuer: {workExpIssuer}</p>
      <p>workExp address: {address}</p>
      <p>workExp issuedOn: {workExpIssuedOn}</p>
      <p>workAs roleType: {roleType}</p>
      <p>workAs jobTitle: {jobTitle}</p>
      <p>workAs startDate: {startDate}</p>
      <p>workAs endDate: {endDate}</p>
      <p>workAs occupationalIndustry: {occupationalIndustry}</p>
      <p>workAs occupationalCategory: {occupationalCategory}</p>
      <p>workLocation address: {workLocationAddress}</p>
      <p>workLocation geo: {geo}</p>
      <p>validity: {validity}</p>
    </div>
  );
};

export default Certificate;
