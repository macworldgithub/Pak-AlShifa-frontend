"use client";
import { useState } from "react";

export default function PersonalAllergic() {
  const [allergyType, setAllergyType] = useState("");
  const [allergySeverity, setAllergySeverity] = useState("");
  const [allergenCode, setAllergenCode] = useState("");
  const [allergenReaction, setAllergenReaction] = useState("");
  const [onsetDate, setOnsetDate] = useState("2025-11-15");

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Left Box */}
      <div className="w-full md:w-1/2 border rounded-md bg-white p-4 mb-4 md:mb-0">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-black">
            Allergy Type
          </label>
          <select
            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
            value={allergyType}
            onChange={(e) => setAllergyType(e.target.value)}
          >
            <option value="text-black">Select Allergy Type</option>
            <option value="food text-black text-black">Food</option>
            <option value="drug text-black text-black">Drug</option>
            <option value="environmental text-black text-black">
              Environmental
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Allergen Code
          </label>
          <input
            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
            type="text"
            placeholder="Search Allergen Code"
            value={allergenCode}
            onChange={(e) => setAllergenCode(e.target.value)}
          />
        </div>
      </div>
      {/* Right Box */}
      <div className="w-full md:w-1/2 border rounded-md bg-white p-4">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-black">
            Allergy Severity
          </label>
          <select
            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
            value={allergySeverity}
            onChange={(e) => setAllergySeverity(e.target.value)}
          >
            <option value="text-black">Select Severity</option>
            <option value="mild text-black">Mild</option>
            <option value="moderate text-black">Moderate</option>
            <option value="severe text-black">Severe</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Allergen Reaction
            </label>
            <select
              className="w-full border border-gray-400 rounded px-2 py-1 text-black"
              value={allergenReaction}
              onChange={(e) => setAllergenReaction(e.target.value)}
            >
              <option value="text-black">Select Reaction</option>
              <option value="rash text-black">Rash</option>
              <option value="swelling text-black">Swelling</option>
              <option value="anaphylaxis text-black">Anaphylaxis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Onset Date
            </label>
            <input
              className="w-full border border-gray-400 rounded px-2 py-1 bg-gray-200 text-black"
              type="date"
              value={onsetDate}
              onChange={(e) => setOnsetDate(e.target.value)}
              min="1900-01-01"
              max="2099-12-31"
            />
            <div className="text-xs text-gray-500 mt-1">
              {onsetDate
                ? new Date(onsetDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
