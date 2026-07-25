import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useLoginHook } from "../hook/login.hook"
const Login = () => {
  const { isLoading, loginData, validateMessages, handleInputChange, handleLoginSubmit } = useLoginHook();
  return (
    <div className="auth-card">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome Back
      </h1>

      <Input
        label="Email"
        type={"text"}
        placeholder="Enter email"
        name="email"
        value={loginData?.email}
        handleChange={handleInputChange}
        errorMessage={validateMessages?.email}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        name="password"
        value={loginData?.password}
        handleChange={handleInputChange}
        errorMessage={validateMessages?.password}
      />

      <div className="mt-4 mb-4 text-right text-sm">
        Forgot Password?
      </div>

      <Button
        title={isLoading ? "Logging..." : "Login"}
        onClick={handleLoginSubmit}
        disabled={isLoading}
      />

      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register">
          <b>Create account</b>
        </Link>
      </div>
    </div>
  );
};

export default Login;