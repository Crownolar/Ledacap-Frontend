// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function ProtectedRoute({ children, requiredRole }) {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/login" />;

//   if (requiredRole && user.role !== requiredRole)
//     return <div className="text-red-500">Access Denied</div>;

//   return children;
// }

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, requiredRole }) {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (requiredRole && user.role !== requiredRole) {
//     return <div className="p-6 text-red-600">Access Denied</div>;
//   }

//   return children;
// }

// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, requiredRole }) {
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Not logged in → redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Logged in but wrong role → redirect to their own dashboard
//   if (requiredRole && user.role !== requiredRole) {
//     return <Navigate to={`/dashboard/${user.role}`} replace />;
//   }

//   // Otherwise render the page
//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return children;
}
