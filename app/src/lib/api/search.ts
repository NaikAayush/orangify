import { v4 as uuidv4 } from "uuid";
import { axiosInstance } from "./api";

const buildBody = (jobTitle: string) => {
  return {
    context: {
      domain: "dsep:jobs",
      action: "search",
      version: "1.0.0",
      bap_id: "dsep-protocol.becknprotocol.io",
      bap_uri: "https://dsep-protocol-network.becknprotocol.io/",
      transaction_id: uuidv4(),
      message_id: uuidv4(),
      timestamp: new Date().toISOString(),
      ttl: "PT30S",
    },
    message: {
      intent: {
        item: {
          descriptor: {
            name: jobTitle,
          },
        },
      },
    },
  };
};

export const searchWithJobTitle = async (jobTitle: string) => {
  const response = await axiosInstance.post("/search", buildBody(jobTitle));

  console.log(response.data);
  return response.data;
};
