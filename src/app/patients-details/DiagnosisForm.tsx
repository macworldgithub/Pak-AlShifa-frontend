// // src/app/patients-details/DiagnosisForm.tsx
// "use client";

// import { useState } from "react";

// interface DiagnosisFormData {
//   vaccination: string; // Assuming top field is Vaccination as per image
//   finalDiagnosis: string;
//   search: string;
// }

// export default function DiagnosisForm() {
//   const [formData, setFormData] = useState<DiagnosisFormData>({
//     vaccination: "",
//     finalDiagnosis: "",
//     search: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     // Handle save logic here, e.g., API call
//     console.log("Saving diagnosis data:", formData);
//   };

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//       <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
//         Diagnosis
//       </h2>

//       {/* Vaccination Field (top input as per image) */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Vaccination
//         </label>
//         <input
//           type="text"
//           name="vaccination"
//           value={formData.vaccination}
//           onChange={handleInputChange}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
//         />
//       </div>

//       {/* Final Diagnosis Section */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Final Diagnosis
//         </label>
//         <div className="flex space-x-2">
//           {/* Select Favorite */}
//           <select
//             name="finalDiagnosis"
//             value={formData.finalDiagnosis}
//             onChange={handleInputChange}
//             className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
//           >
//             <option value="">Select Favorite</option>
//             <option value="Diagnosis 1">Diagnosis 1</option>
//             <option value="Diagnosis 2">Diagnosis 2</option>
//             {/* Add more options as needed */}
//           </select>

//           {/* Search */}
//           <input
//             type="text"
//             name="search"
//             value={formData.search}
//             onChange={handleInputChange}
//             placeholder="Search"
//             className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
//           />
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleSave}
//           className="px-6 py-2 border border-gray-300 text-black rounded-md cursor-pointer focus:outline-none"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Select } from "antd";
import { BACKEND_URL } from "@/config"; // Adjust path if necessary

interface Visit {
  _id: string;
  visitDate: string;
  patient: { name: string };
  doctorAssigned: { fullName: string };
}

interface DiagnosisFormData {
  narrativeDiagnosis: string; // Changed from vaccination
  finalDiagnosis: string;
}

export default function DiagnosisForm() {
  const [formData, setFormData] = useState<DiagnosisFormData>({
    narrativeDiagnosis: "",
    finalDiagnosis: "",
  });
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [diagnosisId, setDiagnosisId] = useState<string>("");
  const [diagnosisOptions, setDiagnosisOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/visits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch visits");
      }

      const data: Visit[] = await response.json();
      setVisits(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch visits. Please try again.");
    }
  };

  const handleVisitChange = async (value: string) => {
    setVisitId(value);
    setDiagnosisId("");
    setFormData({
      narrativeDiagnosis: "",
      finalDiagnosis: "",
    });

    if (value) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please login first.");
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/diagnoses/visit/${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          try {
            const diagnosis = await response.json();
            if (diagnosis) {
              setFormData({
                narrativeDiagnosis: diagnosis.narrativeDiagnosis || "",
                finalDiagnosis: diagnosis.finalDiagnosis || "",
              });
              setDiagnosisId(diagnosis._id);
            }
          } catch (jsonErr) {
            // No body, no diagnosis exists
            console.log("No existing diagnosis found.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch diagnosis.");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDiagnosisSearch = async (value: string) => {
    if (value.length < 3) {
      setDiagnosisOptions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${encodeURIComponent(
          value
        )}&maxList=500`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch diagnoses");
      }

      const data = await response.json();
      const names = data[3] || []; // 4th element is array of arrays with names
      const options = names.map((nameArr: string[]) => ({
        value: nameArr[0],
        label: nameArr[0],
      }));
      setDiagnosisOptions(options);
    } catch (err) {
      console.error(err);
      setError("Failed to search diagnoses.");
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    if (!visitId) {
      setError("Please select a visit.");
      return;
    }

    try {
      let response;
      if (diagnosisId) {
        // Update
        response = await fetch(`${BACKEND_URL}/diagnoses/${diagnosisId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/diagnoses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, visit: visitId }),
        });
      }

      if (!response.ok) {
        throw new Error(
          diagnosisId
            ? "Failed to update diagnosis"
            : "Failed to create diagnosis"
        );
      }

      setSuccess(
        diagnosisId
          ? "Diagnosis updated successfully."
          : "Diagnosis created successfully."
      );
    } catch (err) {
      console.error(err);
      setError("Failed to save diagnosis. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Diagnosis
      </h2>

      {/* Select Visit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Visit
        </label>
        <Select
          value={visitId}
          onChange={handleVisitChange}
          className="w-full"
          placeholder="Select a visit"
        >
          {visits.map((visit) => (
            <Select.Option key={visit._id} value={visit._id}>
              {visit.patient.name}-{visit.doctorAssigned.fullName}-
              {visit.visitDate.slice(0, 10)}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Narrative Diagnosis Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Narrative Diagnosis
        </label>
        <input
          type="text"
          name="narrativeDiagnosis"
          value={formData.narrativeDiagnosis}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
        />
      </div>

      {/* Final Diagnosis Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Final Diagnosis
        </label>
        <Select
          value={formData.finalDiagnosis}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, finalDiagnosis: value }))
          }
          onSearch={handleDiagnosisSearch}
          className="w-full"
          placeholder="Search and select diagnosis"
          showSearch
          filterOption={false}
        >
          {diagnosisOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 border border-gray-300 text-black rounded-md cursor-pointer focus:outline-none"
        >
          Save
        </button>
      </div>
    </div>
  );
}
