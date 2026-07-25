import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useRegisterHook } from "./../hook/registration.hook"
const Register = () => {
  const { isLoading, validateMessages, registerData, handleInputChange, handleRegisterSubmit } = useRegisterHook();
  return (
    <div className="auth-card">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Account
      </h1>

      <Input
        label="firstName"
        type="text"
        placeholder="Enter First Name"
        name="firstName"
        value={registerData?.firstName}
        handleChange={handleInputChange}
        errorMessage={validateMessages?.firstName}
      />

      <Input
        label="lastName"
        type="text"
        placeholder="Enter Last Name"
        name="lastName"
        value={registerData?.lastName}
        handleChange={handleInputChange}
        errorMessage={validateMessages?.lastName}
      />

      <Input
        label="Email"
        type="text"
        placeholder="Enter Email"
        name="email"
        value={registerData?.email}
        handleChange={handleInputChange}
        errorMessage={validateMessages?.email}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter Password"
        name="password"
        value={registerData?.password}
        handleChange={handleInputChange}
        errorMessage={validateMessages?.password}
      />

      <Button title="Register" onClick={handleRegisterSubmit} />
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-white-600 hover:underline">
          <b>Login</b>
        </Link>
      </div>
    </div>
  );
};

export default Register;