import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../constants";
import { FaBars, FaTimes } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine the navbar text based on the current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Contacts Page";
      case "/dashboard":
        return "Charts and Maps";
      default:
        return "";
    }
  };

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar to show title and hamburger menu */}
      <div className="flex items-center justify-between p-4 bg-white text-sage shadow-sm w-full">
        <h1 className="text-xl font-bold text-center">{getPageTitle()}</h1>
        <button
          className="text-sage focus:outline-none sm:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar with links */}
      <div className="flex flex-grow">
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-[10000] w-64 bg-sage text-white transform transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:relative sm:translate-x-0 sm:w-64 sm:flex sm:flex-col sm:sticky sm:top-0 sm:h-screen`}
        >
          <nav className="flex-grow">
            <ul className="py-6">
              {sidebarLinks.map((item) => (
                <li key={item.id} className="p-4">
                  <Link
                    to={item.link}
                    className={`block py-2 px-4 rounded ${
                      location.pathname === item.link
                        ? "bg-white text-sage font-bold"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 sm:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-grow p-4 overflow-auto bg-[#dddddd]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
