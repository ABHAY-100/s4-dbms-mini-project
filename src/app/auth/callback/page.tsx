"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { supabase } from "@/utils/supabase/client"; // Adjust import path as necessary

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      if (session) {
        // Store session tokens securely if needed
        localStorage.setItem('supabase.auth.token', session.access_token);
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // If no session, redirect to auth page
        router.push('/auth');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default CallbackPage;
