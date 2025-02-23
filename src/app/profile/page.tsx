"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login"); // Redirect after logout
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome, {user?.username}!</h1>
        <p>Email: {user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}
