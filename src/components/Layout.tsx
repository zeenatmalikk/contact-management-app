import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../constants";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  const location = useLocation();

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
  return (
    <div className="flex flex-col h-screen ">
      {/* Navbar to show title */}
      <div className="bg-gray-200 p-4 text-gray-700 shadow w-full ">
        <h1 className="text-xl text-center font-bold">{getPageTitle()}</h1>
      </div>

      {/* Sidebar with links */}
      <div className="flex flex-grow ">
        <div className="w-64 bg-gray-800 text-white flex flex-col sticky top-0 h-screen ">
          <nav className="flex-grow">
            <ul>
              {sidebarLinks.map((item) => (
                <li className="p-4">
                  <Link
                    key={item.id}
                    to={item.link}
                    className="hover:bg-gray-700 block"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
