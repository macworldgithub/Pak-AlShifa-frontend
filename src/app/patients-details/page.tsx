// src/app/patients-details/page.tsx
"use client";

import { useState, useEffect } from "react";
import Tabs from "./Tabs";
import PatientForm from "./Form";
import ComplaintForm from "./ComplaintForm";
import NursingForm from "../nursing/Nursing-form";
import VaccineForm from "./VaccineForm";
import DiagnosisForm from "./DiagnosisForm";
import MedicalAssessmentForm from "./MedicalAssessmentForm";
import TreatmentForm from "./TreatmentForm";
import MedicineForm from "./MedicineForm";
import NotesForm from "./NotesForm";
import PatientFilesForm from "./PatientFilesForm";
import DischargeForm from "./DischargeForm";
import ECGForm from "./ECGForm";
import Data from "./Data";
import PersonalAllergic from "./PersonalAllergic";
import SocialHistory from "./SocialHistory";
import FamilyHistory from "./FamilyHistory";

export default function Shifa3() {
  const [activeTab, setActiveTab] = useState("Nursing Assessments");
  const [activeSubTab, setActiveSubTab] = useState("Patients Details");
  const [formData, setFormData] = useState({
    visitDate: "",
    fileNo: "",
    patientName: "",
    dob: "",
    age: "",
    sex: "Male",
    emiratesId: "",
    mobileNo: "",
    email: "",
    nationality: "",
    corporateName: "",
    company: "",
    remark: "",
  });

  // Set default subtab when main tab changes
  useEffect(() => {
    if (activeTab === "Receptionalist") {
      setActiveSubTab("Patients Details");
    } else if (activeTab === "Nursing Assessments") {
      setActiveSubTab("Nursing");
    } else if (activeTab === "Doctor Assessments") {
      setActiveSubTab("Vaccine"); // Default to Vaccine for Doctor Assessments
    }
  }, [activeTab]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderContent = () => {
    switch (activeSubTab) {
      case "Patients Details":
        return (
          <>
            <PatientForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <div className="mt-8">
              <Data />
            </div>
          </>
        );
      case "Nursing":
        return <NursingForm />;
      case "Complaint":
        return <ComplaintForm />;
      case "Personal Allergic Details":
        return <PersonalAllergic />;
      case "Social History":
        return <SocialHistory />;
        case "Family History":
        return <FamilyHistory />;
      case "Vaccine":
        return <VaccineForm />;
      case "Diagnosis":
        return <DiagnosisForm />;
      case "Medical Assessment":
        return <MedicalAssessmentForm />;
      case "Treatment":
        return <TreatmentForm />;
      case "Medicine":
        return <MedicineForm />;
      case "Notes":
        return <NotesForm />;
      case "Patient Files":
        return <PatientFilesForm />;
      case "Discharge":
        return <DischargeForm />;
      case "ECG":
        return <ECGForm />;
      default:
        return (
          <div className="border border-gray-300 p-4 rounded-sm text-center text-gray-500">
            {activeSubTab} content will be displayed here
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <Tabs
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
      />

      {/* Main Content */}
      <div className="space-y-8">{renderContent()}</div>
    </div>
  );
}
