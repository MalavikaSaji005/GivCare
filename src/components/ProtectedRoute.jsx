 import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {

  const user = auth.currentUser;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}