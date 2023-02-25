const regNumbersOnly = /[^\d]/g;

export const formatPhoneNumber = (phoneNumber: string): string => {
  const number = phoneNumber.replace(regNumbersOnly, "");
  let areaCode = number.substring(0, 3);
  let prefix = number.substring(3, 6);
  let suffix = number.substring(6, 10);
  if (prefix.length > 0) {
    areaCode = `(${areaCode}) `;
  }
  if (suffix.length > 0) {
    prefix = `${prefix}-`;
  }

  return `${areaCode}${prefix}${suffix}`;
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const number = phoneNumber.replace(regNumbersOnly, "");
  return number.length === 10 ? true : false;
};

// A very poor email checker
export const isValidEmail = (emailAddress: string): boolean => {
  const iAt = emailAddress.indexOf("@");
  const iDot = emailAddress.lastIndexOf(".");
  return iAt > 0 && iDot > iAt;
};
