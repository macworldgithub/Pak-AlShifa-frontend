// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { Table, Input, DatePicker, Avatar, Space, Spin, Alert } from "antd";
// import { SearchOutlined, CalendarOutlined } from "@ant-design/icons";
// import type { ColumnsType } from "antd/es/table";
// import dayjs from "dayjs";

// interface PatientTableData {
//   key: string;
//   name: string;
//   age: number | null;
//   email: string;
//   remark: string;
//   createdAt: string;
// }

// const columns: ColumnsType<PatientTableData> = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//     render: (name: string) => (
//       <Space>
//         <Avatar className="bg-gray-400 text-white font-semibold">
//           {name?.charAt(0).toUpperCase() || "N"}
//         </Avatar>
//         <span className="font-medium text-gray-800">{name || "N/A"}</span>
//       </Space>
//     ),
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//     align: "center" as const,
//     width: 80,
//     render: (age: number | null) => (age !== null ? age : "-"),
//   },
//   {
//     title: "Date",
//     key: "createdAt",
//     width: 160,
//     render: (_, record) => (
//       <div className="text-sm">
//         <div className="font-medium">
//           {dayjs(record.createdAt).format("MMMM DD, YYYY")}
//         </div>
//         <div className="text-gray-500">
//           {dayjs(record.createdAt).format("hh:mm A")}
//         </div>
//       </div>
//     ),
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//     key: "email",
//     width: 220,
//     render: (email: string) => email || "-",
//   },
//   {
//     title: "Remark",
//     dataIndex: "remark",
//     key: "remark",
//     width: 200,
//     ellipsis: true,
//     render: (remark: string) => remark || "-",
//   },
// ];

// export default function PatientDataTable() {
//   const [patients, setPatients] = useState<PatientTableData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Filter states
//   const [searchText, setSearchText] = useState<string>("");
//   const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

//   // Fetch function with filters
//   const fetchPatients = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         setError("No authentication token found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       // Build query params
//       const params = new URLSearchParams();
//       if (searchText.trim()) {
//         params.append("search", searchText.trim());
//       }
//       if (selectedDate) {
//         params.append("date", selectedDate.format("YYYY-MM-DD"));
//       }

//       const url = `https://www.shifa-backend.omnisuiteai.com/patients${
//         params.toString() ? `?${params.toString()}` : ""
//       }`;

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           accept: "*/*",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }

//       const data = await response.json();

//       const formattedPatients: PatientTableData[] = data.map(
//         (patient: any) => ({
//           key: patient._id,
//           name: patient.name || "N/A",
//           age: patient.age,
//           email: patient.email || "",
//           remark: patient.remark || "",
//           createdAt: patient.createdAt,
//         })
//       );

//       setPatients(formattedPatients);
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch patients");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchText, selectedDate]);

//   // Initial load + re-fetch on filter change
//   useEffect(() => {
//     fetchPatients();
//   }, [fetchPatients]);

//   // Handle search input change (with debounce feel)
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchText(e.target.value);
//   };

//   // Handle date change
//   const handleDateChange = (date: dayjs.Dayjs | null) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       {/* Header with Filters */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//         <h2 className="text-xl font-semibold text-gray-800">Patient Data</h2>

//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//           {/* Search Input */}
//           <Input
//             placeholder="Search by name..."
//             prefix={<SearchOutlined className="text-gray-400" />}
//             className="w-full sm:w-64 h-10 rounded-lg border-gray-300"
//             allowClear
//             value={searchText}
//             onChange={handleSearch}
//           />

//           {/* Date Picker */}
//           <DatePicker
//             placeholder="Filter by date"
//             suffixIcon={<CalendarOutlined className="text-gray-500" />}
//             className="w-full sm:w-48 h-10 rounded-lg border-gray-300"
//             value={selectedDate}
//             onChange={handleDateChange}
//             format="YYYY-MM-DD"
//           />
//         </div>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div className="flex justify-center items-center py-12">
//           <Spin size="large" tip="Loading patients..." />
//         </div>
//       )}

//       {/* Error */}
//       {error && (
//         <Alert
//           message="Error"
//           description={error}
//           type="error"
//           showIcon
//           className="mb-6"
//         />
//       )}

//       {/* Table with Horizontal Scroll */}

//       {!loading && !error && patients.length === 0 && (
//         <div className="text-center py-12 text-gray-500">
//           <p className="text-lg">No patients found for the selected filters.</p>
//           <p className="text-sm mt-2">Try changing the search term or date.</p>
//         </div>
//       )}

//       {!loading && !error && patients.length > 0 && (
//         <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
//           <div className="min-w-[800px]">
//             <Table
//               columns={columns}
//               dataSource={patients}
//               pagination={{ pageSize: 10 }}
//               locale={{ emptyText: "No patients found" }} // Yeh bhi help karega
//               rowClassName="hover:bg-gray-50 transition-colors"
//               bordered={false}
//               // scroll={{ x: "max-content" }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// src/app/patients-list/Data.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Table, Input, DatePicker, Avatar, Space, Spin, Alert, Modal, Button } from "antd";
import { SearchOutlined, CalendarOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface PatientTableData {
  key: string;
  name: string;
  age: number | null;
  email: string;
  remark: string;
  createdAt: string;
  _id: string;
}

const columns = (canEdit: boolean, canDelete: boolean, onEdit: (patient: PatientTableData) => void, onDelete: (id: string) => void): ColumnsType<PatientTableData> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <Space>
        <Avatar className="bg-gray-400 text-white font-semibold">
          {name?.charAt(0).toUpperCase() || "N"}
        </Avatar>
        <span className="font-medium text-gray-800">{name || "N/A"}</span>
      </Space>
    ),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    align: "center",
    width: 80,
    render: (age: number | null) => (age !== null ? age : "-"),
  },
  {
    title: "Date",
    key: "createdAt",
    width: 160,
    render: (_, record) => (
      <div className="text-sm">
        <div className="font-medium">
          {dayjs(record.createdAt).format("MMMM DD, YYYY")}
        </div>
        <div className="text-gray-500">
          {dayjs(record.createdAt).format("hh:mm A")}
        </div>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 220,
    render: (email: string) => email || "-",
  },
  {
    title: "Remark",
    dataIndex: "remark",
    key: "remark",
    width: 200,
    ellipsis: true,
    render: (remark: string) => remark || "-",
  },
  {
    title: "Actions",
    key: "actions",
    width: 120,
    fixed: "right",
    render: (_, record) => (
      <Space size="middle">
        {canEdit && (
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </Button>
        )}
        {canDelete && (
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record._id)}
          >
            Delete
          </Button>
        )}
        {!canEdit && !canDelete && <span className="text-gray-400">No actions</span>}
      </Space>
    ),
  },
];

export default function PatientDataTable() {
  const [patients, setPatients] = useState<PatientTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchText, setSearchText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  // User role
  const [userRole, setUserRole] = useState<string>("");

  // Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<PatientTableData | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    email: "",
    remark: "",
  });

  useEffect(() => {
    const role = localStorage.getItem("user_role") || "";
    setUserRole(role);
  }, []);

  const canEdit = ["Receptionist", "Admin"].includes(userRole);
  const canDelete = userRole === "Admin";

  // Fetch function with filters
  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();
      if (searchText.trim()) {
        params.append("search", searchText.trim());
      }
      if (selectedDate) {
        params.append("date", selectedDate.format("YYYY-MM-DD"));
      }

      const url = `https://www.shifa-backend.omnisuiteai.com/patients${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const formattedPatients: PatientTableData[] = data.map((patient: any) => ({
        key: patient._id,
        _id: patient._id,
        name: patient.name || "N/A",
        age: patient.age,
        email: patient.email || "",
        remark: patient.remark || "",
        createdAt: patient.createdAt,
      }));

      setPatients(formattedPatients);
    } catch (err: any) {
      setError(err.message || "Failed to fetch patients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchText, selectedDate]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleEdit = (patient: PatientTableData) => {
    setEditingPatient(patient);
    setEditForm({
      name: patient.name,
      age: patient.age?.toString() || "",
      email: patient.email,
      remark: patient.remark,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingPatient) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Authentication required.");
      return;
    }

    try {
      const response = await fetch(`https://www.shifa-backend.omnisuiteai.com/patients/${editingPatient._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editForm.name,
          age: editForm.age ? parseInt(editForm.age) : null,
          email: editForm.email,
          remark: editForm.remark,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to update patient");
      }

      setIsEditModalOpen(false);
      fetchPatients();
    } catch (err: any) {
      setError(err.message || "Failed to update patient");
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this patient?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Authentication required.");
          return;
        }

        try {
          const response = await fetch(`https://www.shifa-backend.omnisuiteai.com/patients/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to delete patient");
          }

          fetchPatients();
        } catch (err: any) {
          setError(err.message || "Failed to delete patient");
        }
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Patient Data</h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Input
            placeholder="Search by name..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full sm:w-64 h-10 rounded-lg border-gray-300"
            allowClear
            value={searchText}
            onChange={handleSearch}
          />

          <DatePicker
            placeholder="Filter by date"
            suffixIcon={<CalendarOutlined className="text-gray-500" />}
            className="w-full sm:w-48 h-10 rounded-lg border-gray-300"
            value={selectedDate}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" tip="Loading patients..." />
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-6"
        />
      )}

      {/* Empty State */}
      {!loading && !error && patients.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No patients found for the selected filters.</p>
          <p className="text-sm mt-2">Try changing the search term or date.</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && patients.length > 0 && (
        <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
          <div className="min-w-[900px]">
            <Table
              columns={columns(canEdit, canDelete, handleEdit, handleDelete)}
              dataSource={patients}
              pagination={{ pageSize: 10 }}
              scroll={{ x: "max-content" }}
              rowClassName="hover:bg-gray-50 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit Patient"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <Input
              type="number"
              value={editForm.age}
              onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
            <Input.TextArea
              rows={3}
              value={editForm.remark}
              onChange={(e) => setEditForm({ ...editForm, remark: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}