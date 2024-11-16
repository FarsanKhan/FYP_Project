import { Navigate } from "react-router-dom";
import { useStore } from "../../lib/store";

const PrivateRoutes = ({ children }) => {
  const user = useStore((state) => state.user);
  return user ? children : <Navigate to="/" />;
};

const PublicRoutes = ({ children }) => {
  const user = useStore((state) => state.user);
  return user ? <Navigate to="/app" /> : children;
};

export { PublicRoutes, PrivateRoutes };
