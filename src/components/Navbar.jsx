// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   // Dynamic links per role
//   const roleLinks = {
//     admin: [
//       { to: "/dashboard/admin", label: "Dashboard" },
//       { to: "/projects", label: "Projects" },
//       { to: "/users", label: "Users" },
//       { to: "/map", label: "Map" },
//     ],
//     researcher: [
//       { to: "/dashboard/researcher", label: "Dashboard" },
//       { to: "/projects", label: "Projects" },
//       { to: "/samples", label: "Samples" },
//     ],
//     reviewer: [
//       { to: "/dashboard/reviewer", label: "Dashboard" },
//       { to: "/projects", label: "Projects" },
//       { to: "/reviews", label: "Reviews" },
//     ],
//   };

//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       <NavLink to={"/"}>
//         <h1 className="text-xl font-bold text-blue-600">Ledacap</h1>
//       </NavLink>

//       <ul className="flex gap-6 text-gray-700 font-medium items-center">
//         {user ? (
//           <>
//             {/* Show username */}
//             <li className="text-gray-500">Welcome, {user.username}</li>

//             {/* Role-specific links */}
//             {roleLinks[user.role]?.map((link) => (
//               <li key={link.to}>
//                 <NavLink
//                   to={link.to}
//                   className={({ isActive }) =>
//                     isActive ? "text-blue-600 font-bold" : ""
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               </li>
//             ))}

//             {/* Common link */}
//             <li>
//               <NavLink to="/profile">My Profile</NavLink>
//             </li>

//             {/* Logout button */}
//             <li>
//               <button onClick={logout} className="text-red-500 hover:underline">
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/signup">Sign Up</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Role-based links
  const roleLinks = {
    admin: [
      { to: "/dashboard/admin", label: "Dashboard" },
      { to: "/projects", label: "Projects" },
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

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <NavLink to={"/"}>
        <h1 className="text-xl font-bold text-blue-600">Ledacap</h1>
      </NavLink>

      {/* Hamburger button (mobile only) */}
      <button
        className="lg:hidden p-2 border rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Links */}
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-md p-4 lg:static lg:flex lg:w-auto lg:gap-6 lg:shadow-none`}
      >
        {user ? (
          <>
            <li className="text-gray-500 mb-2 lg:mb-0">
              Welcome, {user.username}
            </li>

            {roleLinks[user.role]?.map((link) => (
              <li key={link.to} className="mb-2 lg:mb-0">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : ""
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            <li className="mb-2 lg:mb-0">
              <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                My Profile
              </NavLink>
            </li>

            <li>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="mb-2 lg:mb-0">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
