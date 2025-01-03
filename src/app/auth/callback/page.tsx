"use client";

import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        return;
      }

      if (session) {
        localStorage.setItem("supabase.auth.token", session.access_token);
        router.push("/dashboard");
      } else {
        router.push("/auth");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div>
      {/* <h1>Loading...</h1> */}
    </div>
  );
};

export default CallbackPage;
