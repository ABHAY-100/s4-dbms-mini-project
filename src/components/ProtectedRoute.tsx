"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Adjust based on your Next.js version
import { supabase } from "@/utils/supabase/client"; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkUserAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        // If there is no session, redirect to auth page
        router.push('/auth');
      }
    };

    checkUserAuth();
  }, [router]);

  return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
