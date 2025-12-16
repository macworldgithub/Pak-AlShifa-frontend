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

interface Note {
  _id: string;
  template: string;
  noteContent: string;
}

interface NotesFormData {
  template: string;
  noteContent: string;
}

export default function NotesForm() {
  const initialFormData: NotesFormData = {
    template: "",
    noteContent: "",
  };
  const [formData, setFormData] = useState<NotesFormData>(initialFormData);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [notesList, setNotesList] = useState<Note[]>([]);
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

  const fetchNotes = async (visitId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/notes/visit/${visitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data: Note[] = (await response.json()) || [];
      setNotesList(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch notes.");
    }
  };

  const handleVisitChange = async (value: string) => {
    setVisitId(value);
    setEditingId(null);
    setFormData(initialFormData);
    setNotesList([]);

    if (value) {
      fetchNotes(value);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
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

    try {
      let response;
      if (editingId) {
        // Update
        response = await fetch(`${BACKEND_URL}/notes/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/notes`, {
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
          editingId ? "Failed to update note" : "Failed to create note"
        );
      }

      setSuccess(
        editingId ? "Note updated successfully." : "Note created successfully."
      );
      setFormData(initialFormData);
      setEditingId(null);
      fetchNotes(visitId);
    } catch (err) {
      console.error(err);
      setError("Failed to save note. Please try again.");
    }
  };

  const handleEdit = (note: Note) => {
    setFormData({
      template: note.template || "",
      noteContent: note.noteContent || "",
    });
    setEditingId(note._id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Notes
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
              {visit.patient.name}-{visit.doctorAssigned.fullName}-{visit._id}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Template Select and Notes Textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Template
        </label>
        <select
          name="template"
          value={formData.template}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 mb-4 text-black"
        >
          <option value="">Select Template</option>
          {/* Options */}
        </select>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          name="noteContent"
          value={formData.noteContent}
          onChange={handleInputChange}
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
        />
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

      {/* Existing Notes */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-black">
          Existing Notes
        </h3>
        {notesList.map((note) => (
          <div
            key={note._id}
            className="border border-gray-300 p-4 mb-4 rounded-md"
          >
            <p className="text-black">
              <strong>Template:</strong> {note.template}
            </p>
            <p className="text-black">
              <strong>Notes:</strong> {note.noteContent}
            </p>
            <button
              onClick={() => handleEdit(note)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
