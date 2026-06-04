import AuthLayout from "../layouts/authenticationLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  return (
    <AuthLayout>

      <div className="auth-card">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <Input
          label="Name"
          placeholder="Enter Name"
        />

        <Input
          label="Email"
          placeholder="Enter Email"
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter Password"
        />

        <Button title="Register" />

      </div>

    </AuthLayout>
  );
};

export default Register;