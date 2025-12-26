// "use client";
// import { sidebarMenu } from "../../data/sidebarMenu";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import logo from "../../../public/images/logo.png";

// import {
//   FaFolderOpen,
//   FaQuestionCircle,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { MdOutlineDashboard, MdReport } from "react-icons/md";
// import { BsChatTextFill } from "react-icons/bs";
// import { FiUsers } from "react-icons/fi";


// const iconMap = {
//   MdOutlineDashboard: MdOutlineDashboard,
//   FaFolderOpen: FaFolderOpen,
//   BsChatTextFill: BsChatTextFill,
//   FiUsers: FiUsers, 
//   FaQuestionCircle: FaQuestionCircle,
//   FaCog: FaCog,
//   MdReport: MdReport,
//   FaSignOutAlt: FaSignOutAlt,
// };

// interface SidebarProps {
//   isOpen?: boolean;
//   onClose?: () => void;
// }

// export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
//   const pathname = usePathname();

//   // Filter out logout from main menu
//   const mainMenu = sidebarMenu.filter((item) => !item.logout);
//   const otherMenu = mainMenu.filter((item) => item.section === "other");
//   const generalMenu = mainMenu.filter((item) => !item.section);

//   return (
//     <aside
//       className={`
//       fixed left-0 top-0 h-full bg-white shadow-md flex flex-col transition-all duration-300 ease-in-out z-50
//       w-20 p-3  // Default narrow (icons-only) on mobile
//        md:w-60 md:p-6  // Full width on desktop/tablet
//       transform -translate-x-full md:translate-x-0  // Hidden on mobile
//       ${isOpen ? "translate-x-0" : ""}  // Slide in when open on mobile
//     `}
//     >
//       {/* Logo - Hidden on mobile/narrow */}
//       <div className="mb-8 hidden md:block">
//         {" "}
//         {/* md:block: Show only on desktop */}
//         <Image src={logo} alt="Logo" width={140} height={140} />
//       </div>

//       <nav className="flex-1 space-y-4">
//         {" "}
//         {/* space-y-4 for narrow view */}
//         {/* General Section */}
//         {generalMenu.map((item, index) => {
//           const IconComponent = iconMap[item.icon as keyof typeof iconMap];
//           return (
//             <Link
//               key={index}
//               href={item.href}
//               onClick={() => isOpen && onClose?.()} // Close on mobile click
//               className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all duration-200 text-base justify-center md:justify-start ${
//                 pathname === item.href
//                   ? "bg-[#202858] text-white shadow-md"
//                   : "text-gray-800 hover:bg-gray-50 hover:text-gray-900"
//               }`}
//             >
//               <IconComponent className="text-lg flex-shrink-0" />
//               <span className="hidden md:inline whitespace-nowrap">
//                 {item.name}
//               </span>{" "}
//               {/* Hide text on mobile */}
//             </Link>
//           );
//         })}
//         {/* Other Section - Only on desktop/full view */}
//         <div className="mt-8 pt-2 border-t hidden md:block">
//           {" "}
//           {/* md:block: Show only desktop */}
//           <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">
//             Other
//           </h3>
//           <div className="space-y-2">
//             {otherMenu.map((item, index) => {
//               const IconComponent = iconMap[item.icon as keyof typeof iconMap];
//               return (
//                 <Link
//                   key={index}
//                   href={item.href}
//                   onClick={() => isOpen && onClose?.()}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-medium transition-all duration-200 ${
//                     pathname === item.href
//                       ? "bg-[#202858] text-white shadow-md"
//                       : "text-gray-800 hover:bg-gray-50 hover:text-gray-900"
//                   }`}
//                 >
//                   <IconComponent className="text-lg" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </nav>

//       {/* Logout - Icons only on mobile */}
//       <Link
//         href="/logout"
//         onClick={() => isOpen && onClose?.()}
//         className="flex items-center gap-3 px-4 py-3 text-gray-800 transition-all duration-200 justify-center md:justify-start"
//       >
//         <FaSignOutAlt className="text-lg flex-shrink-0" />
//         <span className="hidden md:inline">Log Out</span>
//       </Link>
//     </aside>
//   );
// }

"use client";

import { sidebarMenu } from "../../data/sidebarMenu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../../public/images/logo.png";

import {
  FaFolderOpen,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineDashboard, MdReport } from "react-icons/md";
import { BsChatTextFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const iconMap = {
  MdOutlineDashboard: MdOutlineDashboard,
  FaFolderOpen: FaFolderOpen,
  BsChatTextFill: BsChatTextFill,
  FiUsers: FiUsers,
  FaQuestionCircle: FaQuestionCircle,
  FaCog: FaCog,
  MdReport: MdReport,
  FaSignOutAlt: FaSignOutAlt,
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Only general menu items remain
  const generalMenu = sidebarMenu;

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full bg-white shadow-md flex flex-col transition-all duration-300 ease-in-out z-50
        w-20 p-3
        md:w-60 md:p-6
        transform -translate-x-full md:translate-x-0
        ${isOpen ? "translate-x-0" : ""}
      `}
    >
      {/* Logo */}
      <div className="mb-8 hidden md:block">
        <Image src={logo} alt="Logo" width={140} height={140} />
      </div>

      <nav className="flex-1 space-y-4">
        {generalMenu.map((item, index) => {
          const IconComponent =
            iconMap[item.icon as keyof typeof iconMap];

          return (
            <Link
              key={index}
              href={item.href}
              onClick={() => isOpen && onClose?.()}
              className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all duration-200 text-base justify-center md:justify-start ${
                pathname === item.href
                  ? "bg-[#202858] text-white shadow-md"
                  : "text-gray-800 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <IconComponent className="text-lg flex-shrink-0" />
              <span className="hidden md:inline whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout removed */}
    </aside>
  );
}
