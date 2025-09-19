import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const roleLinks = {
    admin: [
      { to: "/dashboard/admin", label: "Dashboard" },
      { to: "/projects", label: "Projects" },
      { to: "/samples", label: "Samples" },
      { to: "/reviews", label: "Reviews" },
      { to: "/users", label: "Users" },
      { to: "/map", label: "Map" },
    ],
    researcher: [
      { to: "/dashboard/researcher", label: "Dashboard" },
      { to: "/projects", label: "Projects" },
      { to: "/samples", label: "Samples" },
    ],
    reviewer: [
      { to: "/dashboard/reviewer", label: "Dashboard" },
      { to: "/projects", label: "Projects" },
      { to: "/reviews", label: "Reviews" },
    ],
  };

  const dashboardPaths = [
    ...(user ? roleLinks[user.role]?.map((link) => link.to) : []),
    "/profile",
    "/samples",
    "/projects/new",
  ];

  const isDashboard = dashboardPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const navLinkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition ${
      isActive
        ? "font-semibold bg-yellow-300 text-gray-900"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md p-4 flex justify-between items-center relative text-white z-50">
      <NavLink to={"/"}>
        <h1 className="text-2xl font-bold">Ledacap</h1>
      </NavLink>

      <button
        className="lg:hidden p-2 border rounded z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:static lg:flex lg:w-auto lg:bg-transparent lg:shadow-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
            <button
              className="text-gray-600 text-xl"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          <ul className="flex flex-col gap-2 p-4 lg:flex-row lg:items-center lg:gap-6 lg:p-0">
            {!isDashboard ? (
              user ? (
                <>
                  <li>
                    <NavLink
                      to="/about"
                      className={navLinkStyle}
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={navLinkStyle}
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/dashboard/${user.role}`}
                      className={navLinkStyle}
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-100 transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/about"
                      className={navLinkStyle}
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={navLinkStyle}
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={navLinkStyle}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className={navLinkStyle}
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )
            ) : (
              <>
                {roleLinks[user?.role]?.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={navLinkStyle}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to="/profile"
                    className={navLinkStyle}
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
