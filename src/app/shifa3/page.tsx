import React from "react";


export default function PatientDetails() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {["Nursing Assessments", "Doctor Assessments", "Invoiced"].map(
            (t, i) => (
              <button
                key={i}
                className={`px-4 py-2 text-sm rounded-md shadow-sm whitespace-nowrap ${
                  i === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {t}
              </button>
            )
          )}
        </div>

        {/* Sub Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "Patients Details",
            "Nursing",
            "Complaint",
            "Vaccine",
            "Diagnosis",
            "Medical Assessment",
            "Treatment",
            "Medicine",
            "Notes",
            "Patient Files",
            "Discharge",
            "ECG",
           
          ].map((t, i) => (
            <button
              key={i}
              className={`px-4 py-1 text-sm rounded-md whitespace-nowrap ${
                t === "Patients Details"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Patient Details */}
        <h2 className="text-xl font-semibold mb-4">Patient Details</h2>

        <form className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Visit Date</label>
              <input type="date" className="input" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">File No.</label>
              <input type="text" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium">Patient Name</label>
              <input type="text" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium">DOB</label>
              <input type="date" className="input" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input type="number" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium">Sex</label>
              <input type="text" className="input" />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Emirates ID</label>
              <input type="text" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium">Mobile No.</label>
              <input type="text" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input type="email" className="input" />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Nationality</label>
              <input type="text" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Corporate Name
              </label>
              <input type="text" className="input" />
            </div>
          </div>

          {/* Row 6 */}
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input type="text" className="input" />
          </div>

          {/* Row 7 */}
          <div>
            <label className="block text-sm font-medium">Remark</label>
            <textarea className="input h-28" />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
