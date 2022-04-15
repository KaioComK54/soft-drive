import { Navigate } from "react-router-dom";
import { getAuthToken } from "utils/useAuth";

export type PrivateRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

const isAuthenticated = () => {
  const token = getAuthToken();

  return !!token;
};

export default function PrivateRoute({
  authenticationPath,
  outlet,
}: PrivateRouteProps) {
  if (isAuthenticated()) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
