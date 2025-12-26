// src/app/patients-details/PaymentForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Select, InputNumber, Input, message } from "antd";
import { BACKEND_URL } from "@/config";

interface Visit {
  _id: string;
  visitDate: string;
  patient: { name: string };
  doctorAssigned: { fullName: string };
}

export default function PaymentForm() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");
  const [formData, setFormData] = useState({
    consultationFee: 0,
    paymentMethod: "Cash" as "Cash" | "Card",
    discount: 0,
    totalPaidAmount: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingPayment, setFetchingPayment] = useState(false);

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

      if (!response.ok) throw new Error("Failed to fetch visits");

      const data: Visit[] = await response.json();
      setVisits(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch visits.");
    }
  };

  const handleVisitChange = async (value: string) => {
    setVisitId(value);
    setPaymentId("");
    setFormData({
      consultationFee: 0,
      paymentMethod: "Cash",
      discount: 0,
      totalPaidAmount: 0,
    });
    setError(null);
    setSuccess(null);

    if (!value) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    setFetchingPayment(true);
    try {
      const response = await fetch(`${BACKEND_URL}/payments/visit/${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const payment = await response.json();
        if (payment) {
          setFormData({
            consultationFee: payment.consultationFee || 0,
            paymentMethod: payment.paymentMethod || "Cash",
            discount: payment.discount || 0,
            totalPaidAmount: payment.totalPaidAmount || 0,
          });
          setPaymentId(payment._id);
          message.info("Existing payment loaded.");
        } else {
          // No payment exists yet — ready for new entry
          message.info("No payment recorded yet. You can create one now.");
        }
      }
      // If 404 or empty, it's fine — we just create new
    } catch (err) {
      console.log("No existing payment (likely 404) — ready to create new.");
      // Don't show error for missing payment
    } finally {
      setFetchingPayment(false);
    }
  };

  // Auto-calculate total
  useEffect(() => {
    const total = formData.consultationFee - formData.discount;
    if (total >= 0) {
      setFormData((prev) => ({ ...prev, totalPaidAmount: total }));
    }
  }, [formData.consultationFee, formData.discount]);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    if (!visitId) {
      setError("Please select a visit.");
      setLoading(false);
      return;
    }

    try {
      const url = paymentId
        ? `${BACKEND_URL}/payments/${paymentId}`
        : `${BACKEND_URL}/payments`;

      const method = paymentId ? "PUT" : "POST";

      const body = paymentId
        ? formData
        : { ...formData, visit: visitId };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save payment");
      }

      const result = await response.json();

      if (!paymentId) {
        setPaymentId(result._id); // Now we have an ID for future updates
      }

      setSuccess(paymentId ? "Payment updated successfully." : "Payment recorded successfully.");
      message.success(paymentId ? "Payment updated!" : "Payment recorded!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save payment.");
      message.error(err.message || "Failed to save payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-300 pb-4">
        Payment Details
      </h2>

      {/* Select Visit */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Visit
        </label>
        <Select
          value={visitId || undefined}
          onChange={handleVisitChange}
          className="w-full"
          placeholder="Select a visit to record payment"
          loading={fetchingPayment}
          showSearch
          optionFilterProp="label"
        >
          {visits.map((visit) => (
            <Select.Option
              key={visit._id}
              value={visit._id}
              label={`${visit.patient.name} - ${visit.doctorAssigned.fullName}`}
            >
              {visit.patient.name}-{visit.doctorAssigned.fullName}-
              {visit.visitDate.slice(0, 10)}
            </Select.Option>
          ))}
        </Select>
      </div>

      {visitId && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Fee (AED)
              </label>
              <InputNumber
                min={0}
                value={formData.consultationFee}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    consultationFee: value ?? 0,
                  }))
                }
                className="w-full"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <Select
                value={formData.paymentMethod}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: value,
                  }))
                }
                className="w-full"
              >
                <Select.Option value="Cash">Cash</Select.Option>
                <Select.Option value="Card">Card</Select.Option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (AED)
              </label>
              <InputNumber
                min={0}
                max={formData.consultationFee}
                value={formData.discount}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    discount: value ?? 0,
                  }))
                }
                className="w-full"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Amount Due (AED)
              </label>
              <InputNumber
                value={formData.totalPaidAmount}
                disabled
                className="w-full"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                style={{ width: "100%", backgroundColor: "#f3f4f6" }}
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-4">{success}</div>}

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className={`px-8 py-3 rounded-md text-white font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
            >
              {loading
                ? "Saving..."
                : paymentId
                ? "Update Payment"
                : "Record Payment"}
            </button>
          </div>
        </>
      )}

      {!visitId && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Select a visit to record or update payment</p>
        </div>
      )}
    </div>
  );
}