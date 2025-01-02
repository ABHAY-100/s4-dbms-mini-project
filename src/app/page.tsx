"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { supabase } from "@/utils/supabase/client"; // Adjust the import path as necessary

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUserAuth = async () => {
      // Check for existing session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      // Redirect based on authentication status
      if (session) {
        // User is authenticated, redirect to dashboard
        router.push('/dashboard');
      } else {
        // User is not authenticated, redirect to auth page
        router.push('/auth');
      }
    };

    checkUserAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/auth');
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  return null;
}
