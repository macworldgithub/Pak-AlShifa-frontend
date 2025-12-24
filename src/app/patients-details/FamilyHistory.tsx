"use client";

import { useState, useEffect } from "react";
import { Select, Table } from "antd";
import { BACKEND_URL } from "@/config";

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

interface Visit {
  _id: string;
  visitDate: string;
  patient: { name: string };
  doctorAssigned: { fullName: string };
}

interface FamilyHistoryEntry {
  _id: string;
  relationship: string;
  conditions: string[];
}

export default function FamilyHistory() {
  const [selectedConditions, setSelectedConditions] = useState<{
    [key: string]: boolean;
  }>({});
  const [relationship, setRelationship] = useState("");
  const [others, setOthers] = useState("");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [history, setHistory] = useState<FamilyHistoryEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  const fetchHistory = async (visitId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/family-histories/visit/${visitId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch family history");
      }

      const data: FamilyHistoryEntry[] = await response.json();
      setHistory(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch family history.");
    }
  };

  const handleVisitChange = async (value: string) => {
    setVisitId(value);
    setEditingId(null);
    setSelectedConditions({});
    setRelationship("");
    setOthers("");
    setHistory([]);

    if (value) {
      fetchHistory(value);
    }
  };

 
  const handleToggle = (option: string) => {
    setSelectedConditions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleSubmit = async () => {
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

    const conditions = Object.keys(selectedConditions).filter(
      (key) => selectedConditions[key]
    );
    if (others) {
      conditions.push(others);
    }

    if (conditions.length === 0 || !relationship) {
      setError("Please select at least one condition and relationship.");
      return;
    }

    const bodyData = {
      relationship,
      conditions,
    };

    try {
      let response;
      if (editingId) {
       
        response = await fetch(`${BACKEND_URL}/family-histories/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });
      } else {
      
        response = await fetch(`${BACKEND_URL}/family-histories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...bodyData, visit: visitId }),
        });
      }

      if (!response.ok) {
        throw new Error(
          editingId
            ? "Failed to update family history"
            : "Failed to create family history"
        );
      }

      setSuccess(
        editingId
          ? "Family history updated successfully."
          : "Family history created successfully."
      );
      setSelectedConditions({});
      setRelationship("");
      setOthers("");
      setEditingId(null);
      fetchHistory(visitId);
    } catch (err) {
      console.error(err);
      setError("Failed to save family history. Please try again.");
    }
  };

  const handleEdit = (entry: FamilyHistoryEntry) => {
    setRelationship(entry.relationship);
    let selected: { [key: string]: boolean } = {};
    entry.conditions.forEach((cond: string) => {
      if (familyOptions.includes(cond)) {
        selected[cond] = true;
      } else {
        setOthers(cond);
      }
    });
    setSelectedConditions(selected);
    setEditingId(entry._id);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    if (confirm("Are you sure you want to delete this family history entry?")) {
      try {
        const response = await fetch(`${BACKEND_URL}/family-histories/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete family history");
        }

        setSuccess("Family history deleted successfully.");
        fetchHistory(visitId);
      } catch (err) {
        console.error(err);
        setError("Failed to delete family history.");
      }
    }
  };

  return (
    <div className="w-full">
   
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


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 mb-2">
        {familyOptions.map((option) => (
          <div key={option} className="flex items-center gap-2 text-black">
            <button
              type="button"
              onClick={() => handleToggle(option)}
              className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors duration-200 text-black ${
                selectedConditions[option] ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 text-black ${
                  selectedConditions[option] ? "translate-x-4" : ""
                }`}
              />
            </button>
            <span className="text-sm text-black">{option}</span>
          </div>
        ))}
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Others
          </label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1 text-black"
            type="text"
            placeholder="Others"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">
            Relationship
          </label>
          <select
            className="w-full border border-gray-300 rounded px-2 py-1 text-black"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="">--Select Relationship--</option>
            {relationships.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

    
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 border border-gray-300 text-black rounded-md cursor-pointer focus:outline-none"
        >
          Save
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      
      <Table
        dataSource={history.map((entry, index) => ({
          ...entry,
          key: entry._id,
          serialNumber: index + 1,
        }))}
        columns={[
          {
            title: "#",
            dataIndex: "serialNumber",
            key: "serialNumber",
            width: 60,
          },
          {
            title: "Relationship",
            dataIndex: "relationship",
            key: "relationship",
          },
          {
            title: "Family History",
            dataIndex: "conditions",
            key: "conditions",
            render: (conditions: string[]) => conditions.join(", "),
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="px-2 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        scroll={{ x: true }}
        size="small"
        className="mt-4"
      />
    </div>
  );
}
