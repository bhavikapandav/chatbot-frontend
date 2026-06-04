import AuthLayout from "../layouts/authenticationLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  return (
    <AuthLayout>
      <div className="auth-card">

        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        <Input
          label="Email"
          placeholder="Enter email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
        />

        <Button title="Login" />

        <div className="mt-4 text-center text-sm">
          Forgot Password?
        </div>

      </div>
    </AuthLayout>
  );
};

export default Login;