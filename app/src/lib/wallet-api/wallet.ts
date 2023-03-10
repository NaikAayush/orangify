import { AddCertificateBody } from "../../models/wallet";
import { auth } from "../firebase";
import { walletAxiosInstance } from "./api";

export const getAllCertificateTypes = async () => {
  const response = await walletAxiosInstance.get("/certs/types");

  console.log(response.data);
  return response.data;
};

export const getCertificateByID = async () => {
  const response = await walletAxiosInstance.get("/certs/types");

  console.log(response.data);
  return response.data;
};

export const getMyCertificates = async () => {
  const params = new URLSearchParams();
  params.append("issuedTo", auth.currentUser?.phoneNumber as string);
  const response = await walletAxiosInstance.get("/certs/issuedTo?", {
    params,
  });

  console.log(response.data);
  return response.data;
};

export const addCertificate = async (body: AddCertificateBody) => {
  const response = await walletAxiosInstance.post("/certs/add", body);

  console.log(response.data);
  return response.data;
};
