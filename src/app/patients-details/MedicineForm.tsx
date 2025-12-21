// // src/app/patients-details/MedicineForm.tsx
// "use client";

// import { useState } from "react";

// interface MedicineFormData {
//   selectFavorite: string;
//   someText: string;
//   trade: string;
//   firstUse: string;
//   medicineType1: string;
//   frequency1: string;
//   durationDays1: string;
//   qty1: string;
//   secondUse: string;
//   medicineType2: string;
//   frequency2: string;
//   durationDays2: string;
//   qty2: string;
// }

// export default function MedicineForm() {
//   const [formData, setFormData] = useState<MedicineFormData>({
//     selectFavorite: "",
//     someText: "",
//     trade: "",
//     firstUse: "",
//     medicineType1: "",
//     frequency1: "",
//     durationDays1: "",
//     qty1: "",
//     secondUse: "",
//     medicineType2: "",
//     frequency2: "",
//     durationDays2: "",
//     qty2: "",
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
//     console.log("Saving medicine data:", formData);
//   };

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//       <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
//         Medicine
//       </h2>

//       {/* Top Row: Select Favorite (narrow), Some Text (wide), Trade (narrow) */}
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
//         {/* Select Favorite */}
//         <div className="lg:col-span-1">
//           <select
//             name="selectFavorite"
//             value={formData.selectFavorite}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
//           >
//             <option value="">Select Favorite</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>

//         {/* Some Text (wide) */}
//         <div className="lg:col-span-3">
//           <input
//             type="text"
//             name="someText"
//             value={formData.someText}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
//             placeholder="Some Text"
//           />
//         </div>

//         {/* Trade */}
//         <div className="lg:col-span-1">
//           <select
//             name="trade"
//             value={formData.trade}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
//           >
//             <option value="">Trade</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>
//       </div>

//       {/* First Use Section */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Use
//         </label>
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
//           {/* Use (input) */}
//           <input
//             type="text"
//             name="firstUse"
//             value={formData.firstUse}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
//           />

//           {/* Medicine Type (select) */}
//           <select
//             name="medicineType1"
//             value={formData.medicineType1}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
//           >
//             <option value="">Medicine Type</option>
//             {/* Add more options as needed */}
//           </select>

//           {/* Frequency (select) */}
//           <select
//             name="frequency1"
//             value={formData.frequency1}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
//           >
//             <option value="">Frequency</option>
//             {/* Add more options as needed */}
//           </select>

//           {/* Duration(Days) (select) */}
//           <select
//             name="durationDays1"
//             value={formData.durationDays1}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
//           >
//             <option value="">Duration(Days)</option>
//             {/* Add more options as needed */}
//           </select>

//           {/* Qty (input) */}
//           <input
//             type="text"
//             name="qty1"
//             value={formData.qty1}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
//           />
//         </div>
//       </div>

//       {/* Second Use Section */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Use
//         </label>
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
//           {/* Use (select) */}
//           <select
//             name="secondUse"
//             value={formData.secondUse}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
//           >
//             <option value="">Use</option>
//             {/* Add more options as needed */}
//           </select>
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

interface Medicine {
  _id: string;
  medicineName: string;
  medicineType: string;
  frequency: string;
  duration: number;
  tradeName: string;
  quantity: number;
  use: string;
}

interface Concept {
  rxcui: string;
  fullName: string;
}

interface MedicineFormData {
  use: string;
  medicineName: string;
  medicineType: string;
  frequency: string;
  duration: string;
  tradeName: string;
  quantity: string;
}

export default function MedicineForm() {
  const initialFormData: MedicineFormData = {
    use: "",
    medicineName: "",
    medicineType: "",
    frequency: "",
    duration: "",
    tradeName: "",
    quantity: "",
  };
  const [formData, setFormData] = useState<MedicineFormData>(initialFormData);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchVisits();
    fetchConcepts();
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

  const fetchConcepts = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/medicines/all-concepts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medicine concepts");
      }

      const data: Concept[] = await response.json();
      setConcepts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch medicine concepts. Please try again.");
    }
  };

  const fetchMedicines = async (visitId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/medicines/visit/${visitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medicines");
      }

      const data: Medicine[] = await response.json();
      setMedicines(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch medicines.");
    }
  };

  const handleVisitChange = async (value: string) => {
    setVisitId(value);
    setEditingId(null);
    setFormData(initialFormData);
    setMedicines([]);

    if (value) {
      fetchMedicines(value);
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

    const bodyData = {
      ...formData,
      duration: formData.duration ? Number(formData.duration) : undefined,
      quantity: formData.quantity ? Number(formData.quantity) : undefined,
    };

    try {
      let response;
      if (editingId) {
        // Update
        response = await fetch(`${BACKEND_URL}/medicines/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/medicines`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...bodyData, visit: visitId }),
        });
      }

      if (!response.ok) {
        throw new Error(editingId ? "Failed to update medicine" : "Failed to create medicine");
      }

      setSuccess(editingId ? "Medicine updated successfully." : "Medicine created successfully.");
      setFormData(initialFormData);
      setEditingId(null);
      fetchMedicines(visitId);
    } catch (err) {
      console.error(err);
      setError("Failed to save medicine. Please try again.");
    }
  };

  const handleEdit = (med: Medicine) => {
    setFormData({
      use: med.use || "",
      medicineName: med.medicineName || "",
      medicineType: med.medicineType || "",
      frequency: med.frequency || "",
      duration: med.duration ? med.duration.toString() : "",
      tradeName: med.tradeName || "",
      quantity: med.quantity ? med.quantity.toString() : "",
    });
    setEditingId(med._id);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    if (confirm("Are you sure you want to delete this medicine?")) {
      try {
        const response = await fetch(`${BACKEND_URL}/medicines/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete medicine");
        }

        setSuccess("Medicine deleted successfully.");
        fetchMedicines(visitId);
      } catch (err) {
        console.error(err);
        setError("Failed to delete medicine.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Medicine
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

      {/* Medicine Form */}
      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* Use */}
          <input
            type="text"
            name="use"
            value={formData.use}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
            placeholder="Use"
          />

          {/* Medicine Name (from concepts) */}
          <Select
            value={formData.medicineName}
            onChange={(value) => setFormData((prev) => ({ ...prev, medicineName: value }))}
            className="w-full"
            placeholder="Medicine Name"
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) => (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())}
          >
            {concepts.map((concept) => (
              <Select.Option key={concept.rxcui} value={concept.fullName} label={concept.fullName}>
                {concept.fullName}
              </Select.Option>
            ))}
          </Select>

          {/* Medicine Type */}
          <select
            name="medicineType"
            value={formData.medicineType}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          >
            <option value="">Medicine Type</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
            <option value="Cream">Cream</option>
            <option value="Ointment">Ointment</option>
            <option value="Drops">Drops</option>
            <option value="Inhaler">Inhaler</option>
            <option value="Patch">Patch</option>
            <option value="Suppository">Suppository</option>
          </select>

          {/* Frequency */}
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          >
            <option value="">Frequency</option>
            <option value="Once daily">Once daily</option>
            <option value="Twice daily">Twice daily</option>
            <option value="Three times daily">Three times daily</option>
            <option value="Four times daily">Four times daily</option>
            <option value="Every 6 hours">Every 6 hours</option>
            <option value="Every 8 hours">Every 8 hours</option>
            <option value="Every 12 hours">Every 12 hours</option>
            <option value="As needed">As needed</option>
            <option value="At bedtime">At bedtime</option>
            <option value="With meals">With meals</option>
          </select>

          {/* Duration(Days) */}
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
            placeholder="Duration (Days)"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Trade Name */}
          <input
            type="text"
            name="tradeName"
            value={formData.tradeName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
            placeholder="Trade Name"
          />

          {/* Quantity */}
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
            placeholder="Qty"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      {/* Save Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleSave}
          className="px-6 py-2 border border-gray-300 text-black rounded-md cursor-pointer focus:outline-none"
        >
          Save
        </button>
      </div>

      {/* Existing Medicines */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Existing Medicines</h3>
        {medicines.map((med) => (
          <div key={med._id} className="border border-gray-300 p-4 mb-4 rounded-md">
            <p className="text-black"><strong>Use:</strong> {med.use}</p>
            <p className="text-black"><strong>Medicine Name:</strong> {med.medicineName}</p>
            <p className="text-black"><strong>Medicine Type:</strong> {med.medicineType}</p>
            <p className="text-black"><strong>Frequency:</strong> {med.frequency}</p>
            <p className="text-black"><strong>Duration:</strong> {med.duration}</p>
            <p className="text-black"><strong>Trade Name:</strong> {med.tradeName}</p>
            <p className="text-black"><strong>Quantity:</strong> {med.quantity}</p>
            <button
              onClick={() => handleEdit(med)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(med._id)}
              className="mt-2 px-4 py-1 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}