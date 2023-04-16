import { Navigate } from "react-router-dom";

function PublicRoutes({ children }: any) {
  const auth = localStorage.getItem("data");
  if (auth) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
}

export default PublicRoutes;
