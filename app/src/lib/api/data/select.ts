export const selectData = {
  context: {
    domain: "dsep:jobs",
    version: "1.0.0",
    action: "select",
    bap_id: "dsep-protocol.becknprotocol.io",
    bap_uri: "https://dsep-protocol-network.becknprotocol.io/",
    bpp_id: "affinidi.com.bpp",
    bpp_uri: "https://6vs8xnx5i7.execute-api.ap-south-1.amazonaws.com/dsep",
    transaction_id: "a9aaecca-10b7-4d19-b650-b047a7c62195",
    message_id: "92d41ba5-8645-4307-a7a6-0a8d97ea497d",
    ttl: "PT10M",
    timestamp: "2023-02-26T23:24:30.110Z",
  },
  responses: [
    {
      context: {
        domain: "dsep:jobs",
        location: {
          country: {
            name: "India",
            code: "IND",
          },
        },
        action: "on_select",
        version: "1.0.0",
        bap_id: "dsep-protocol.becknprotocol.io",
        bap_uri: "https://dsep-protocol-network.becknprotocol.io/",
        bpp_id: "affinidi.com.bpp",
        bpp_uri: "https://6vs8xnx5i7.execute-api.ap-south-1.amazonaws.com/dsep",
        transaction_id: "a9aaecca-10b7-4d19-b650-b047a7c62195",
        message_id: "92d41ba5-8645-4307-a7a6-0a8d97ea497d",
        timestamp: "2023-02-26T23:24:30.1998323+00:00",
        ttl: "P1M",
      },
      message: {
        order: {
          provider: {
            descriptor: {
              name: "Orange Jobs",
            },
            fulfillments: [
              {
                id: "1",
                type: "remote",
                tracking: false,
              },
              {
                id: "2",
                type: "hybrid",
                tracking: false,
              },
              {
                id: "3",
                type: "Onsite",
                tracking: false,
              },
            ],
            locations: [
              {
                id: "1",
                city: {
                  name: "Bangalore",
                },
              },
            ],
          },
          items: [
            {
              id: "6f775971f4cb196d62f1233e4b4ade3b369b417afcdd6ae8089129827fab6a47",
              descriptor: {
                name: "Software Developer",
                long_desc:
                  "We are looking for a Software Developer to join our team. The ideal candidate is a self-motivated individual with a passion for developing high-quality software.",
              },
              category_ids: ["1", "2"],
              fulfillment_ids: ["1", "2", "3"],
              location_ids: ["1"],
              xinput: {
                form: {
                  url: "https://6vs8xnx5i7.execute-api.ap-south-1.amazonaws.com/dsep/xinput/formid/6f775971f4cb196d62f1233e4b4ade3b369b417afcdd6ae8089129827fab6a47",
                },
              },
              time: {
                range: {
                  start: "2023-01-03T13:23:01+00:00",
                  end: "2023-02-03T13:23:01+00:00",
                },
              },
              tags: [
                {
                  descriptor: {
                    name: "Minimum Educational Qualifications",
                  },
                  list: [
                    {
                      descriptor: {
                        name: "degree",
                        code: "degree",
                      },
                      value: "Bachelors",
                    },
                    {
                      descriptor: {},
                      value: "Bachelors or Equivalent Practical Experience",
                    },
                  ],
                  display: true,
                },
                {
                  descriptor: {
                    name: "Preferred Educational Qualifications",
                  },
                  list: [
                    {
                      descriptor: {
                        name: "degree",
                        code: "degree",
                      },
                      value: "Masters",
                    },
                    {
                      descriptor: {
                        name: "degree",
                        code: "degree",
                      },
                      value: "PhD",
                    },
                    {
                      descriptor: {},
                      value:
                        "Master's degree or PhD in Computer Science or related technical field.",
                    },
                  ],
                  display: true,
                },
                {
                  descriptor: {
                    name: "Work Experience",
                  },
                  list: [
                    {
                      descriptor: {
                        name: "Software Development Experienceegree",
                        code: "Software Development Experienceegree",
                      },
                      value: "3 years",
                    },
                    {
                      descriptor: {},
                      value: "2 years of Technical Leadership Experience",
                    },
                    {
                      descriptor: {},
                      value:
                        "3 years of experience working in a complex, matrixed organization",
                    },
                  ],
                  display: true,
                },
                {
                  descriptor: {
                    name: "Responsibilities",
                  },
                  list: [
                    {
                      value:
                        "Build frontend experiences for our tools (Web, PWA and React Native) ",
                    },
                    {
                      value:
                        "Articulate a long term technical direction and vision for building, maintaining, and scaling our web and mobile platforms",
                    },
                    {
                      value:
                        "Create trustworthy user experiences by building interfaces that are simple, easy to comprehend, performant and reliable using modern tools like React, React Native, Typescript, Node.js, Jest and Webpack.",
                    },
                    {
                      value:
                        "Mentor and train other team members on design techniques and coding standards. ",
                    },
                    {
                      value: "Own all aspects of our front-end architecture ",
                    },
                    {
                      value:
                        "Contribute to process improvements and build a high-performance engineering culture ",
                    },
                  ],
                  display: true,
                },
                {
                  descriptor: {
                    name: "Employment Information",
                    code: "employment-info",
                  },
                  list: [
                    {
                      descriptor: {
                        name: "Employment Duration Type",
                        code: "emp-duration-type",
                      },
                      value: "FULL_TIME",
                    },
                    {
                      descriptor: {
                        name: "Employment Duration Type",
                        code: "emp-duration-type",
                      },
                      value: "",
                    },
                  ],
                  display: true,
                },
                {
                  descriptor: {
                    name: "skill requirement",
                    code: "Skills",
                  },
                  list: [
                    {
                      descriptor: {
                        code: "You have 8+ years of engineering experience, predominantly in shipping user-facing production features",
                      },
                    },
                    {
                      descriptor: {
                        code: "You are an expert in React.js and React Native, ideally using TypeScript language extensions  ",
                      },
                    },
                    {
                      descriptor: {
                        code: "You have a good understanding of JavaScript Design Patterns ",
                      },
                    },
                    {
                      descriptor: {
                        code: "You have good experience writing front end test cases  ",
                      },
                    },
                    {
                      descriptor: {
                        code: "You’re familiar with current trends and best practices in front-end architecture, including performance, security and usability.  ",
                      },
                    },
                    {
                      descriptor: {
                        code: "You’re familiar with product and design lifecycles, and collaborating closely with designers, engineers, and product managers ",
                      },
                    },
                    {
                      descriptor: {
                        code: "You have experience with Test Driven Development and know when to apply it.",
                      },
                    },
                    {
                      descriptor: {
                        code: "You have experience working on AWS or other cloud stacks and Docker.  ",
                      },
                    },
                    {
                      descriptor: {
                        code: "You have experience building systems with high data protection requirements, anonymous data and data encryption. ",
                      },
                    },
                    {
                      descriptor: {
                        code: "You have experience with IaaC. ",
                      },
                    },
                    {
                      descriptor: {
                        code: "You have worked on building responsive UI using React Native. ",
                      },
                    },
                  ],
                  display: true,
                },
                {
                  descriptor: {
                    name: "Salary Compensation",
                    code: "salary-info",
                  },
                  list: [
                    {
                      descriptor: {
                        name: "baseSalary",
                      },
                      value: "60000",
                    },
                    {
                      descriptor: {
                        name: "variableSalary",
                      },
                      value: "60000",
                    },
                    {
                      descriptor: {
                        name: "allowance",
                      },
                      value: "60000",
                    },
                    {
                      descriptor: {
                        name: "commission",
                      },
                      value: "60000",
                    },
                    {
                      descriptor: {
                        name: "overtime",
                      },
                      value: "8",
                    },
                  ],
                  display: true,
                },
              ],
            },
          ],
          type: "DEFAULT",
        },
      },
    },
  ],
};
