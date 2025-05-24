import { Button, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ISignupRequest } from "./signup.model";
import { SignUpService } from "./signup.service";
import { useState } from "react";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const signupService = new SignUpService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupRequest>();
  const [serverError, setServerError] = useState("");

  const handleSignUp = async (data: ISignupRequest) => {
    setServerError("");
    const response = await signupService.signup(data);

    if (response.isSuccess) {
      console.log("Registration successful:", response.registerData);
      navigate("/login");
    } else {
      console.error("Registration failed:", response.errorData);
      setServerError(response.errorData?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Paper className="p-6 w-full max-w-md shadow-lg rounded-2xl">
        <Typography
          variant="h4"
          className="text-center text-green-600 font-bold mb-4"
        >
          Sign Up for EcoBin
        </Typography>

        <form onSubmit={handleSubmit(handleSignUp)} noValidate>
          <TextField
            label="First name"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName")}
          />
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
          <TextField
            label="Secret Key"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.secretKey}
            helperText={errors.secretKey?.message}
            {...register("secretKey")}
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
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" className="text-center mt-4">
          Already have an account?
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {" "}
            Log In
          </span>
        </Typography>
      </Paper>
    </div>
  );
};

export default Signup;
