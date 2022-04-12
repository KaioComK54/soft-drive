import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

const isAuthenticated = () => true;

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
