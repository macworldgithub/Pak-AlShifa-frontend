"use client";
import { useState } from "react";

const familyOptions = [
  "None",
  "High BP",
  "Gastiones",
  "Smoking",
  "Arthritis",
  "Heart Disease",
  "Brochillis",
  "IHD",
  "Diabetes",
  "Thyroid Disease",
  "HIV",
  "TB",
  "Liver Disease",
  "Asthma",
  "Eating Disorder",
  "Malignancy",
  "Epilepsy",
  "Emphysema",
  "Surgery",
  "Blood Transfusions",
  "Kidney Diseases",
  "Hypercholesterol",
];

const relationships = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Son",
  "Daughter",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Aunt",
  "Other",
];

export default function FamilyHistory() {
  const [selected, setSelected] = useState({});
  const [relationship, setRelationship] = useState("");
  const [others, setOthers] = useState("");
  const [rows, setRows] = useState([]);

  // Toggle handler
  const handleToggle = (option) => {
    setSelected((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="w-full">
      {/* Toggles */}
      <div className="grid grid-cols-4 gap-x-6 gap-y-2 mb-2">
        {familyOptions.map((option) => (
          <div key={option} className="flex items-center gap-2 text-black">
            <button
              type="button"
              onClick={() => handleToggle(option)}
              className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors duration-200 text-black  ${
                selected[option] ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 text-black ${
                  selected[option] ? "translate-x-4" : ""
                }`}
              />
            </button>
            <span className="text-sm text-black">{option}</span>
          </div>
        ))}
      </div>

      {/* Others and Relationship */}
      <div className="flex gap-4 mb-2">
        <input
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-black"
          type="text"
          placeholder="Others"
          value={others}
          onChange={(e) => setOthers(e.target.value)}
        />
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">
            Relationship
          </label>
          <select
            className="w-full border border-gray-300 rounded px-2 py-1 text-black"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="text-black">--Select Relationship--</option>
            {relationships.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border mt-2">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="border px-2 py-1 text-left w-10 text-black">#</th>
            <th className="border px-2 py-1 text-left text-black">
              Relationship
            </th>
            <th className="border px-2 py-1 text-left text-black">
              Family History
            </th>
          </tr>
        </thead>
        <tbody>{/* Example row, you can map rows here if needed */}</tbody>
      </table>
    </div>
  );
}
