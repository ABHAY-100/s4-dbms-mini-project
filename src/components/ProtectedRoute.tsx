"use client";
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Adjust based on your Next.js version
import { supabase } from "@/utils/supabase/client"; // Adjust the import path as necessary

interface ProtectedRouteProps {
  children: ReactNode; // Define children as ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
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
