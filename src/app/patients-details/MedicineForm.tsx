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

import React from "react";

export default function MedicineUIExact() {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 w-full shadow-sm">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        Medicine
      </h2>

      {/* FIRST ROW */}
      <div className="grid grid-cols-12 gap-3 mb-4">
        {/* Select Favorite */}
        <div className="col-span-12 md:col-span-2 flex flex-col">
          {/* <label className="text-xs font-medium  mb-1">Select Favorite</label> */}
          <input
            className="h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2 text-black placeholder:text-black"
            placeholder="Select Favorite"
          />
        </div>

        {/* Some Text */}
        <div className="col-span-12 md:col-span-8 flex flex-col">
          {/* <label className="text-xs font-medium text-gray-600 mb-1">
            Some Text
          </label> */}
          <input
            className="h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2 text-black placeholder:text-black"
            placeholder="Some Text"
          />
        </div>

        {/* Trade */}
        <div className="col-span-12 md:col-span-2 flex flex-col">
          {/* <label className="text-xs font-medium text-gray-600 mb-1">
            Trade
          </label> */}
          {/* <select className="h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2" /> */}
          <input
            className="h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2 text-black placeholder:text-black"
            placeholder="Trade"
          />
        </div>
      </div>

      {/* FIRST USE ROW */}
      <div className="mb-1 text-xs font-medium text-gray-700">Use</div>

      <div className="grid grid-cols-12 gap-3 mb-4">
        <input className="col-span-12 md:col-span-2 h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2" />

        <select className="col-span-12 md:col-span-2 h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2" />

        <select className="col-span-12 md:col-span-2 h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2" />
        {/* <label className="text-xs font-medium  mb-1">Select Favorite</label> */}
        <input
          placeholder="Duration(Days)"
          className="col-span-12 md:col-span-2 h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2"
        />

        <input
          placeholder="Qty"
          className="col-span-12 md:col-span-2 h-8 border border-gray-300 rounded bg-gray-100 text-sm px-2"
        />
      </div>

      {/* SECOND USE */}
      <div className="mb-1 text-xs font-medium text-gray-700">Use</div>
      <select className="h-8 w-40 border border-gray-300 rounded bg-gray-100 text-sm px-2 mb-6" />

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-5 py-1.5 border border-gray-400 rounded text-sm">
          Save
        </button>
      </div>
    </div>
  );
}
