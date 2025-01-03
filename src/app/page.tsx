"use client";

import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUserAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        return;
      }

      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/auth");
      }
    };

    checkUserAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/auth");
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  return null;
}
