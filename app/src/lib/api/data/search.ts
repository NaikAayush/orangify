export const searchData = {
  context: {
    domain: "dsep:jobs",
    version: "1.0.0",
    action: "search",
    bap_id: "dsep-protocol.becknprotocol.io",
    bap_uri: "https://dsep-protocol-network.becknprotocol.io/",
    transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
    message_id: "cd1b7063-3927-44ef-b66d-42c199b22e71",
    ttl: "PT10M",
    timestamp: "2023-02-26T23:15:49.959Z",
  },
  responses: [
    {
      context: {
        domain: "dsep:jobs",
        version: "1.0.0",
        action: "on_search",
        bap_id: "dsep-protocol.becknprotocol.io",
        bap_uri: "https://dsep-protocol-network.becknprotocol.io/",
        transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
        message_id: "cd1b7063-3927-44ef-b66d-42c199b22e71",
        ttl: "PT10M",
        timestamp: "2023-02-26T23:15:49.959Z",
        bpp_id: "orangify-network-2",
        bpp_uri: "https://bpp.orangify.network/beckn",
      },
      message: {
        catalog: {
          descriptor: {
            name: "Orange Jobs",
          },
          providers: [
            {
              id: "0",
              descriptor: {
                name: "Acme Corporation",
              },
              locations: [
                {
                  id: "1",
                  descriptor: {
                    name: "Acme Corporation",
                  },
                  country: {
                    name: "US",
                  },
                  city: {
                    name: "CA",
                  },
                },
              ],
              items: [
                {
                  id: "1234",
                  descriptor: {
                    name: "Software Developer",
                    long_desc:
                      "We are looking for a Software Developer to join our team. The ideal candidate is a self-motivated individual with a passion for developing high-quality software.",
                  },
                  location_ids: ["1"],
                },
              ],
            },
          ],
        },
      },
    },
  ],
};
