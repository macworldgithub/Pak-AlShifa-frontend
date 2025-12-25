
export const sidebarMenu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    active: true,
    icon: "MdOutlineDashboard",
  },
  { name: "Patients Details", href: "/patients-details", icon: "FaFolderOpen" },
  // { name: "Patients List", href: "/patients-list", icon: "BsChatTextFill" },

  {
    name: "Help & Center",
    href: "/help-center",
    section: "other",
    icon: "FaQuestionCircle",
  },
  { name: "Settings", href: "/settings", section: "other", icon: "FaCog" },
  { name: "Report", href: "/report", section: "other", icon: "MdReport" },

  { name: "Log Out", href: "/logout", logout: true, icon: "FaSignOutAlt" },
];
