"use client";

import React from "react";
import { Table, Input, DatePicker, Avatar, Tag, Space } from "antd";
import { SearchOutlined, CalendarOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface PatientData {
  key: string;
  name: string;
  age: number;
  date: string;
  time: string;
  doctor: string;
  treatment: string;
  status: string;
  statusColor: string;
}

const data: PatientData[] = [
  {
    key: "1",
    name: "James Andrew",
    age: 45,
    date: "February 29, 2024",
    time: "10:00 AM",
    doctor: "Dr. Emily Stanton",
    treatment: "Hypertension",
    status: "Confirmed",
    statusColor: "green",
  },
  {
    key: "2",
    name: "Maria Smith",
    age: 32,
    date: "March 5, 2024",
    time: "02:30 PM",
    doctor: "Dr. Aaron Cheung",
    treatment: "Type 2 Diabetes Mellitus",
    status: "Pending Lab Results",
    statusColor: "orange",
  },
  {
    key: "3",
    name: "Sarah Lee",
    age: 52,
    date: "March 10, 2024",
    time: "11:45 AM",
    doctor: "Dr. Michael Kim",
    treatment: "Osteoarthritis",
    status: "Awaiting Surgery Date",
    statusColor: "volcano",
  },
  {
    key: "4",
    name: "David Wilson",
    age: 47,
    date: "March 15, 2024",
    time: "01:00 PM",
    doctor: "Dr. Laura Jones",
    treatment: "Coronary Artery Disease",
    status: "Post-Operative Check",
    statusColor: "red",
  },
  {
    key: "5",
    name: "Christopher",
    age: 38,
    date: "March 22, 2024",
    time: "08:30 AM",
    doctor: "Dr. Nora Fitzgerald",
    treatment: "Depression",
    status: "Follow-up",
    statusColor: "blue",
  },
];

const columns: ColumnsType<PatientData> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <Space>
        <Avatar className="bg-gray-400 text-white font-semibold">
          {record.name.charAt(0)}
        </Avatar>
        <span className="font-medium text-gray-800">{record.name}</span>
      </Space>
    ),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    align: "center" as const,
    width: 80,
  },
  {
    title: "Date",
    key: "date",
    render: (_, record) => (
      <div className="text-sm">
        <div className="font-medium">{record.date}</div>
        <div className="text-gray-500">{record.time}</div>
      </div>
    ),
  },
  {
    title: "Doctor",
    dataIndex: "doctor",
    key: "doctor",
  },
  {
    title: "Treatment",
    dataIndex: "treatment",
    key: "treatment",
  },
  {
    title: "Status",
    key: "status",
    render: (_, record) => (
      <Tag
        color={record.statusColor}
        className="px-3 py-1 text-xs font-medium rounded-full border-0"
      >
        {record.status}
      </Tag>
    ),
    align: "center" as const,
  },
];

export default function PatientDataTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Patient Data</h2>

        <div className="flex items-center gap-3">
          {/* Search */}
          <Input
            placeholder="Search"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-64 h-10 rounded-lg border-gray-300"
            allowClear
          />

          {/* Date Picker */}
          <DatePicker
            suffixIcon={<CalendarOutlined className="text-gray-500" />}
            placeholder="Choose Date"
            className="w-48 h-10 rounded-lg border-gray-300"
          />

          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="ant-table-custom"
        rowClassName="hover:bg-gray-50 transition-colors"
        bordered={false}
      />
    </div>
  );
}
