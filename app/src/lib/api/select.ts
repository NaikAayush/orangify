import { v4 as uuidv4 } from "uuid";
import { axiosInstance } from "./api";
import { selectData } from "./data/select";

const buildBody = (jobId: string) => {
  return {
    context: {
      domain: "dsep:jobs",
      action: "select",
      version: "1.0.0",
      bap_id: "dsep-protocol.becknprotocol.io",
      bap_uri: "https://dsep-protocol-network.becknprotocol.io/",
      bpp_id: "affinidi.com.bpp",
      bpp_uri: "https://6vs8xnx5i7.execute-api.ap-south-1.amazonaws.com/dsep",
      transaction_id: uuidv4(),
      message_id: uuidv4(),
      timestamp: new Date().toISOString(),
      ttl: "P1M",
    },
    message: {
      order: {
        items: [
          {
            id: jobId,
          },
        ],
      },
    },
  };
};

export const selectJob = async (jobId: string) => {
  if (import.meta.env.VITE_USE_LOCAL === "true") {
    return selectData;
  }
  const response = await axiosInstance.post("/select", buildBody(jobId));

  return response.data;
};
