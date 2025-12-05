"use client";

interface FormData {
  visitDate: string;
  fileNo: string;
  patientName: string;
  dob: string;
  age: string;
  sex: string;
  emiratesId: string;
  mobileNo: string;
  email: string;
  nationality: string;
  corporateName: string;
  company: string;
  remark: string;
}

interface FormProps {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export default function PatientForm({
  formData,
  handleInputChange,
}: FormProps) {
  return (
    <div className="border border-gray-300 bg-white p-6 rounded-sm">
      <h2 className="text-base font-semibold mb-4 text-gray-700 border-b border-gray-200 pb-3">
        Patient Details
      </h2>

      <form className="space-y-6">
        {/* Visit Date */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Visit Date</label>
          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleInputChange}
            className="w-48 px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* Row 1: File No. | Patient Name | D.O.B. | Age | Sex */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
          {/* File No. */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">File No.</label>
            <input
              type="text"
              name="fileNo"
              value={formData.fileNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
            />
          </div>

          {/* Patient Name - Longer field */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-600 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
            />
          </div>

          {/* D.O.B. */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">D.O.B.</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Age.</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="35"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-black placeholder:text-black"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Row 2: Emirates ID | Mobile No. | Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Emirates ID
            </label>
            <input
              type="text"
              name="emiratesId"
              value={formData.emiratesId}
              onChange={handleInputChange}
              placeholder="784-XXXX-XXXXXXX-X"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-black placeholder:text-black"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Mobile No.
            </label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              placeholder="05X XXXXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-black placeholder:text-black"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>

        {/* Nationality & Corporate Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Corporate Name
            </label>
            <input
              type="text"
              name="corporateName"
              value={formData.corporateName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>

        {/* Company */}
        <div className="max-w-lg">
          <label className="block text-xs text-gray-600 mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
          />
        </div>

        {/* Remark */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Remark</label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleInputChange as any}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded text-xs resize-none text-black placeholder:text-black"
            placeholder="Enter any remarks..."
          />
        </div>

        {/* Save Button - Right Aligned */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
