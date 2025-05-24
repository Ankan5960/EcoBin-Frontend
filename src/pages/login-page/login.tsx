import { Button, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ILoginRequest } from "./login.model";
import { useState } from "react";
import { LogInService } from "./login.service";
import { setAuthState } from "@/store/authStore";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const loginService = new LogInService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>();
  const [serverError, setServerError] = useState("");

  const handleLogin = async (data: ILoginRequest) => {
    setServerError("");
    const response = await loginService.logIn(data, setAuthState);

    if (response.isSuccess) {
      console.log("Login successful:", response.userData);
      window.location.href = "/dashboard";
    } else {
      console.error("Login failed:", response.errorData);
      setServerError(response.errorData?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Paper className="p-6 w-full max-w-md shadow-lg rounded-2xl">
        <Typography
          variant="h4"
          className="text-center text-green-600 font-extrabold mb-4"
        >
          Login to EcoBin
        </Typography>

        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {serverError && (
            <Typography color="error" className="mt-2">
              {serverError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Log In
          </Button>
        </form>
        <Typography variant="body2" className="text-center mt-4">
          Don't have an account?
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            {" "}
            Sign Up
          </span>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;
