"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    }
  }, [user, router]);

  if (!user) return null; // Prevent rendering the page until redirect

  return <>{children}</>;
};

export default ProtectedRoute;
