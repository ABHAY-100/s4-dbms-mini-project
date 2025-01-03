"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/utils/supabase/client";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkUserAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        router.push('/auth');
      }
    };

    checkUserAuth();
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
