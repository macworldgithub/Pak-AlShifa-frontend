"use client";

import { useState, useEffect } from "react";
import { Select, Table } from "antd";
import { BACKEND_URL } from "@/config";

interface Visit {
  _id: string;
  visitDate: string;
  patient: { name: string };
  doctorAssigned: { fullName: string };
}

interface SocialHistoryEntry {
  _id: string;
  socialType: string;
  socialDescription: string;
  quantity: string;
}

export default function SocialHistory() {
  const [socialType, setSocialType] = useState("");
  const [socialDescription, setSocialDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [histories, setHistories] = useState<SocialHistoryEntry[]>([]);
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

  const fetchHistories = async (visitId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/social-histories/visit/${visitId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch social history");
      }

      const data: SocialHistoryEntry[] = await response.json();
      setHistories(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch social history.");
    }
  };

  const handleVisitChange = async (value: string) => {
    setVisitId(value);
    setEditingId(null);
    resetForm();
    setHistories([]);

    if (value) {
      fetchHistories(value);
    }
  };

  const resetForm = () => {
    setSocialType("");
    setSocialDescription("");
    setQuantity("");
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

    const bodyData = {
      socialType,
      socialDescription,
      quantity,
    };

    try {
      let response;
      if (editingId) {
       
        response = await fetch(`${BACKEND_URL}/social-histories/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });
      } else {
       
        response = await fetch(`${BACKEND_URL}/social-histories`, {
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
            ? "Failed to update social history"
            : "Failed to create social history"
        );
      }

      setSuccess(
        editingId
          ? "Social history updated successfully."
          : "Social history created successfully."
      );
      resetForm();
      setEditingId(null);
      fetchHistories(visitId);
    } catch (err) {
      console.error(err);
      setError("Failed to save social history. Please try again.");
    }
  };

  const handleEdit = (entry: SocialHistoryEntry) => {
    setSocialType(entry.socialType);
    setSocialDescription(entry.socialDescription);
    setQuantity(entry.quantity);
    setEditingId(entry._id);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    if (confirm("Are you sure you want to delete this social history entry?")) {
      try {
        const response = await fetch(`${BACKEND_URL}/social-histories/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete social history");
        }

        setSuccess("Social history deleted successfully.");
        fetchHistories(visitId);
      } catch (err) {
        console.error(err);
        setError("Failed to delete social history.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Social History
      </h2>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Social Type
          </label>
          <select
            className="w-full border border-gray-300 rounded px-2 py-1 text-black"
            value={socialType}
            onChange={(e) => setSocialType(e.target.value)}
          >
            <option value="">---Select---</option>
            <option value="smoking">Smoking</option>
            <option value="alcohol">Alcohol</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Social Description
          </label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1 text-black"
            type="text"
            value={socialDescription}
            onChange={(e) => setSocialDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Quantity
          </label>
          <select
            className="w-full border border-gray-300 rounded px-2 py-1 text-black"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
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
        dataSource={histories.map((entry, index) => ({
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
            title: "Social Type",
            dataIndex: "socialType",
            key: "socialType",
          },
          {
            title: "Social Description",
            dataIndex: "socialDescription",
            key: "socialDescription",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
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
