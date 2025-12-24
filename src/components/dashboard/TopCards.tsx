// import React from "react";
// import { CiCalendar } from "react-icons/ci";
// import { LuUserCheck, LuUserX } from "react-icons/lu";
// import { FiUsers } from "react-icons/fi";

// interface TopCardProps {
//   title: string;
//   value: number;
//   icon: React.ReactNode;
// }

// const TopCard: React.FC<TopCardProps> = ({ title, value, icon }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
//     <div>
//       <div className="flex item-center gap-3">
//         <div className="p-1 rounded-sm bg-gray-100">
//           <div className="text-[#67A95F] text-2xl">{icon}</div>
//         </div>
//         <p className="text-gray-600 text-sm font-medium content-center">
//           {title}
//         </p>
//       </div>
//       <p className="text-xl font-semibold text-gray-900 mt-2">{value}</p>
//     </div>
//   </div>
// );

// const TopCards = () => {
//   const cards = [
//     {
//       title: "Booked Patients",
//       value: 145,
//       icon: <CiCalendar />,
//     },
//     {
//       title: "Arrived Patients",
//       value: 98,
//       icon: <LuUserCheck />,
//     },
//     {
//       title: "Cancelled Patients",
//       value: 12,
//       icon: <LuUserX />,
//     },
//     {
//       title: "No-Show Patients",
//       value: 8,
//       icon: <FiUsers />,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//       {cards.map((card, i) => (
//         <TopCard
//           key={i}
//           title={card.title}
//           value={card.value}
//           icon={card.icon}
//         />
//       ))}
//     </div>
//   );
// };

// export default TopCards;

import React from "react";
import { CiCalendar } from "react-icons/ci";
import { LuUserCheck, LuUserX } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "@/config";
interface TopCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const TopCard: React.FC<TopCardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
    <div>
      <div className="flex item-center gap-3">
        <div className="p-1 rounded-sm bg-gray-100">
          <div className="text-[#67A95F] text-2xl">{icon}</div>
        </div>
        <p className="text-gray-600 text-sm font-medium content-center">
          {title}
        </p>
      </div>
      <p className="text-xl font-semibold text-gray-900 mt-2">{value}</p>
    </div>
  </div>
);

const TopCards = () => {
  const [stats, setStats] = useState({
    Booked: 0,
    Arrived: 0,
    Cancelled: 0,
    "No-Show": 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Please login first.");
        }

        const response = await fetch(
          `${BACKEND_URL}/visits/appointment-stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Unexpected error occurred"
        );
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const cards = [
    {
      title: "Booked Patients",
      value: stats.Booked,
      icon: <CiCalendar />,
    },
    {
      title: "Arrived Patients",
      value: stats.Arrived,
      icon: <LuUserCheck />,
    },
    {
      title: "Cancelled Patients",
      value: stats.Cancelled,
      icon: <LuUserX />,
    },
    {
      title: "No-Show Patients",
      value: stats["No-Show"],
      icon: <FiUsers />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <TopCard
          key={i}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default TopCards;
