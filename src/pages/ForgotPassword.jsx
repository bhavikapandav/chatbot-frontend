import AuthLayout from "../layouts/authenticationLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const ForgotPassword = () => {
  return (
    <AuthLayout>

      <div className="auth-card">

        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <Input
          label="Email"
          placeholder="Enter Email"
        />

        <Button title="Send Reset Link" />

      </div>

    </AuthLayout>
  );
};

export default ForgotPassword;