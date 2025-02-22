"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { registerRequest } from "../../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";

const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Inavalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type RegisterForm = z.infer<typeof RegisterSchema>;

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmitRegister = (data: RegisterForm) => {
    dispatch(registerRequest(data));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center">
          Sign Up for Chat
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitRegister)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="username"
              id="name"
              placeholder="Enter your name"
              className="w-full p-3 mt-1 text-gray-800 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 text-gray-800 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 text-gray-800 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-center text-white text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-300 hover:underline">
              Login
            </Link>
          </p>
        </form>
        {error && <p className="text-red-600">{error}</p>}
        {user && <p>Logged in as {user.email}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
