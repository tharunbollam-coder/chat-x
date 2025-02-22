"use client";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest} from "../../../redux/slices/authSlice";
import { RootState } from "../../../redux/store";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Inavalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginForm = z.infer<typeof LoginSchema>;

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const dispatch = useDispatch();
  const {loading,error,user} = useSelector(
    (state: RootState) => state.auth
  );

  const onSubmitLogin = (data: LoginForm) => {
    dispatch(loginRequest(data));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center">
          Login to Chat
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitLogin)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 text-gray-800 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
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
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 text-gray-800 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Loging in...": "Login"}
          </button>
          <p className="text-center text-white text-sm">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-300 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
        {error && <p className="text-red-600">{error}</p>}
        {user && <p>Logged in as {user.email}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
