import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProjectsList from "./pages/projects/ProjectList";
import ProjectDetails from "./pages/projects/ProjectDetails";
import ProjectForm from "./pages/projects/ProjectForm";
import SamplesList from "./pages/samples/SampleList";
import SampleForm from "./pages/samples/SampleForm";
import SampleDetails from "./pages/samples/SampleDetails";
import MapPage from "./pages/map/MapPage";
import UserList from "./pages/users/UserList";
import UserProfile from "./pages/users/UserProfile";
import MapView from "./pages/map/MapView";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ReviewerDashboard from "./pages/dashboard/ReviewerDashboard";
import ResearcherDashboard from "./pages/dashboard/ResearcherDashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Reviews from "./pages/reviews/Reviews";

// Later we will add Samples + Map
export default function App() {
  console.log("App loaded ✅");

  const location = useLocation();

  // Hide Navbar on these routes
  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/reset-password",
    "/forgot-password",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!shouldHideNavbar && <Navbar />}
      <main className="container mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/researcher"
            element={
              <ProtectedRoute requiredRole="researcher">
                <ResearcherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/reviewer"
            element={
              <ProtectedRoute requiredRole="reviewer">
                <ReviewerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Projects */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute requiredRole="admin">
                <ProjectForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id/edit"
            element={
              <ProtectedRoute requiredRole="admin">
                <ProjectForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute role="reviewer">
                <Reviews />
              </ProtectedRoute>
            }
          />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects/:id/edit" element={<ProjectForm />} />
          <Route path="/samples" element={<SamplesList />} />
          <Route path="/samples/new" element={<SampleForm />} />
          <Route path="/samples/:id" element={<SampleDetails />} />
          <Route path="/samples/:id/edit" element={<SampleForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </main>
    </div>
  );
}
