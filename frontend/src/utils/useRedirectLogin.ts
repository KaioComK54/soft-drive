import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "utils/useAuth";

const useRedirectLogin = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    removeAuthToken();
    navigate("/entrar");
  };

  return {
    redirectToLogin,
  };
};

export default useRedirectLogin;
