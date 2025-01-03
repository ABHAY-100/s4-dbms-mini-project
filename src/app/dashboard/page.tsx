"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push("/auth");
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <button
          onClick={handleLogout}
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
