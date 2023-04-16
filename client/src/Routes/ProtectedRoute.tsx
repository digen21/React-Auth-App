import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }: any) {
  const auth = localStorage.getItem("data");
  if (auth) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
export default ProtectedRoutes;
