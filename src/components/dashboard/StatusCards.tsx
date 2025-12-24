// import React, { useState, useEffect } from "react";
// import {
//   AreaChart,
//   Area,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import { BACKEND_URL } from "@/config";

// interface Visit {
//   visitStatus: string;
//   // other fields...
// }

// interface StatusCount {
//   Waiting: number;
//   "Nursing Done": number;
//   "Dr. Done": number;
//   Billed: number;
// }

// const API_ENDPOINT = `${BACKEND_URL}/visits`;

// // Dummy sparkline data (small trend) - you can make this dynamic later if needed
// const sparkData = [
//   { x: 1, y: 78 },
//   { x: 2, y: 80 },
//   { x: 3, y: 75 },
//   { x: 4, y: 82 },
//   { x: 5, y: 78 },
// ];

// const StatusCard: React.FC<{
//   title: string;
//   value: number;
//   change: string;
//   lineColor: string;
// }> = ({ title, value, change, lineColor }) => (
//   <div className="flex flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//     <div className="flex justify-between items-start mb-2">
//       <h4 className="text-sm font-medium text-gray-600">{title}</h4>
//       <p
//         className={`text-xs font-semibold flex items-center gap-1 ${
//           change.startsWith("+") ? "text-green-600" : "text-red-600"
//         }`}
//       >
//         {change} ↑
//       </p>
//     </div>

//     <p className="text-3xl font-bold text-gray-900">{value}</p>

//     <div className="h-14 mt-2">
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart data={sparkData}>
//           <defs>
//             <linearGradient
//               id={`colorFill${title.replace(/\s/g, "")}`}
//               x1="0"
//               y1="0"
//               x2="0"
//               y2="1"
//             >
//               <stop offset="0%" stopColor={lineColor} stopOpacity={0.4} />
//               <stop offset="100%" stopColor={lineColor} stopOpacity={0.05} />
//             </linearGradient>
//           </defs>
//           <Area
//             type="monotone"
//             dataKey="y"
//             stroke={lineColor}
//             strokeWidth={2}
//             fill={`url(#colorFill${title.replace(/\s/g, "")})`}
//           />
//           <XAxis dataKey="x" hide />
//           <YAxis hide />
//           <Tooltip content={() => null} />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   </div>
// );

// const StatusCards: React.FC = () => {
//   const [counts, setCounts] = useState<StatusCount>({
//     Waiting: 0,
//     "Nursing Done": 0,
//     "Dr. Done": 0,
//     Billed: 0,
//   });
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchVisits = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         if (!token) {
//           setError("Please log in to view data.");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(API_ENDPOINT, {
//           method: "GET",
//           headers: {
//             accept: "*/*",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 401) {
//           setError("Session expired. Please log in again.");
//           localStorage.removeItem("access_token");
//           setLoading(false);
//           return;
//         }

//         if (!response.ok && response.status !== 304) {
//           throw new Error(`Failed to fetch visits: ${response.status}`);
//         }

//         const visits: Visit[] = await response.json();

//         // Initialize counts properly
//         const statusCount: StatusCount = {
//           Waiting: 0,
//           "Nursing Done": 0,
//           "Dr. Done": 0,
//           Billed: 0,
//         };

//         // Count each visit
//         visits.forEach((visit) => {
//           const status = visit.visitStatus;
//           if (status === "Waiting") statusCount.Waiting++;
//           else if (status === "Nursing Done") statusCount["Nursing Done"]++;
//           else if (status === "Dr. Done") statusCount["Dr. Done"]++;
//           else if (status === "Billed") statusCount.Billed++;
//           // Optional: handle unknown statuses
//           // else console.warn("Unknown status:", status);
//         });

//         setCounts(statusCount);
//         setLoading(false);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Failed to load visit data"
//         );
//         setLoading(false);
//       }
//     };

//     fetchVisits();
//   }, []);

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 animate-pulse"
//           >
//             <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
//             <div className="h-8 bg-gray-200 rounded w-16"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//       <StatusCard
//         title="Waiting"
//         value={counts.Waiting}
//         change="+5.2%" // You can make this dynamic later
//         lineColor="#0085ff"
//       />
//       <StatusCard
//         title="Nursing Done"
//         value={counts["Nursing Done"]}
//         change="+10%"
//         lineColor="#0085ff"
//       />
//       <StatusCard
//         title="Dr. Done"
//         value={counts["Dr. Done"]}
//         change="+17%"
//         lineColor="#0085ff"
//       />
//       <StatusCard
//         title="Billed"
//         value={counts.Billed}
//         change="+25%"
//         lineColor="#0085ff"
//       />
//     </div>
//   );
// };

// export default StatusCards;

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { BACKEND_URL } from "@/config";

interface StatusCount {
  Waiting: number;
  "Nursing Done": number;
  "Dr. Done": number;
  Billed: number;
}

const StatusCard: React.FC<{
  title: string;
  value: number;
  change: string;
  lineColor: string;
}> = ({ title, value, change, lineColor }) => (
  <div className="flex flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-sm font-medium text-gray-600">{title}</h4>
      {/* <p
        className={`text-xs font-semibold flex items-center gap-1 ${
          change.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        {change} ↑
      </p> */}
    </div>

    <p className="text-3xl font-bold text-gray-900">{value}</p>

    <div className="h-14 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparkData}>
          <defs>
            <linearGradient
              id={`colorFill${title.replace(/\s/g, "")}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="y"
            stroke={lineColor}
            strokeWidth={2}
            fill={`url(#colorFill${title.replace(/\s/g, "")})`}
          />
          <XAxis dataKey="x" hide />
          <YAxis hide />
          <Tooltip content={() => null} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const sparkData = [
  { x: 1, y: 78 },
  { x: 2, y: 80 },
  { x: 3, y: 75 },
  { x: 4, y: 82 },
  { x: 5, y: 78 },
];

const StatusCards: React.FC = () => {
  const [counts, setCounts] = useState<StatusCount>({
    Waiting: 0,
    "Nursing Done": 0,
    "Dr. Done": 0,
    Billed: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Please log in to view data.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BACKEND_URL}/visits/status-counts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch status counts");
        }

        const data = await response.json();
        setCounts(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatusCard
        title="Waiting"
        value={counts.Waiting}
        change="+5.2%" // You can make this dynamic later
        lineColor="#0085ff"
      />
      <StatusCard
        title="Nursing Done"
        value={counts["Nursing Done"]}
        change="+10%"
        lineColor="#0085ff"
      />
      <StatusCard
        title="Dr. Done"
        value={counts["Dr. Done"]}
        change="+17%"
        lineColor="#0085ff"
      />
      <StatusCard
        title="Billed"
        value={counts.Billed}
        change="+25%"
        lineColor="#0085ff"
      />
    </div>
  );
};

export default StatusCards;
