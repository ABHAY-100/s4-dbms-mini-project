"use client"

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { supabase } from "@/utils/supabase/client"; // Adjust the import path as necessary
import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); // Log out the user

    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      // Redirect to auth page after logging out
      router.push('/auth');
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
