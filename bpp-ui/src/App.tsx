import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    datePosted: "",
    validThrough: "",
    description: "",
    hiringOrganizationName: "",
    hiringOrganizationUrl: "",
    jobLocationName: "",
    jobLocationStreetAddress: "",
    jobLocationAddressLocality: "",
    jobLocationAddressRegion: "",
    jobLocationPostalCode: "",
    jobLocationAddressCountry: "",
    jobLocationTypeRemote: false,
    jobLocationTypeOnSite: false,
    employmentTypeFullTime: false,
    jobImmediateStart: false,
    educationDegreeBachelors: false,
    educationDegreeMasters: false,
    experienceWork3To5: false,
    occupationalExperienceRequirementsMinimum: "",
    occupationalExperienceRequirementsOverall: "",
    salaryCurrency: "",
    salaryMinValue: "",
    salaryMaxValue: "",
  });

  const handleInputChange = (event: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>BPP UI</h1>
      <label>
        ID:
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Date Posted:
        <input
          type="datetime-local"
          name="datePosted"
          value={formData.datePosted}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Valid Through:
        <input
          type="datetime-local"
          name="validThrough"
          value={formData.validThrough}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Hiring Organization Name:
        <input
          type="text"
          name="hiringOrganizationName"
          value={formData.hiringOrganizationName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Hiring Organization URL:
        <input
          type="url"
          name="hiringOrganizationUrl"
          value={formData.hiringOrganizationUrl}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Job Location Name:
        <input
          type="text"
          name="jobLocationName"
          value={formData.jobLocationName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Job Location Street Address:
        <input
          type="text"
          name="jobLocationStreetAddress"
          value={formData.jobLocationStreetAddress}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Job Location Address Locality:
        <input
          type="text"
          name="jobLocationAddressLocality"
          value={formData.jobLocationAddressLocality}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Job Location Address Region:
        <input
          type="text"
          name="jobLocationAddressRegion"
          value={formData.jobLocationAddressRegion}
          onChange={handleInputChange}
        />
      </label>
      <button>Create Job</button>
    </form>
  );
}

export default App;
