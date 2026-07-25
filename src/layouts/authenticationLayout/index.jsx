import { Outlet } from "react-router-dom";
const AuthenticationLayout = () => {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;