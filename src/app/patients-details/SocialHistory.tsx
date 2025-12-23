"use client";
import { useState } from "react";

export default function SocialHistory() {
  const [socialType, setSocialType] = useState("");
  const [socialDescription, setSocialDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rows, setRows] = useState([]);

  // Optionally, you can add a function to handle adding rows
  // For now, just the UI as in the image

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Social Type
          </label>
          <select
            className="w-full border border-gray-300 rounded px-2 py-1 text-black"
            value={socialType}
            onChange={(e) => setSocialType(e.target.value)}
          >
            <option value="text-black">---Select---</option>
            <option value="smoking text-black">Smoking</option>
            <option value="alcohol text-black">Alcohol</option>
            <option value="other text-black">Other</option>
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
            <option value="text-black">Select</option>
            <option value="1 text-black">1</option>
            <option value="2 text-black">2</option>
            <option value="3 text-black">3</option>
            <option value="4 text-black">4</option>
            <option value="5 text-black">5</option>
          </select>
        </div>
      </div>
      <table className="w-full border mt-2">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="border px-2 py-1 text-left w-10 text-black">#</th>
            <th className="border px-2 py-1 text-left text-black">
              Social Type
            </th>
            <th className="border px-2 py-1 text-left text-black">
              Social Description
            </th>
            <th className="border px-2 py-1 text-left text-black">Quantity</th>
          </tr>
        </thead>
        <tbody>{/* Example row, you can map rows here if needed */}</tbody>
      </table>
    </div>
  );
}
