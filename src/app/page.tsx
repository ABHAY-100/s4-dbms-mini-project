"use client";

// import { supabase } from "@/utils/supabase/client";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   const checkUserAuth = async () => {
  //     const {
  //       data: { session },
  //       error,
  //     } = await supabase.auth.getSession();

  //     if (error) {
  //       console.error("Error fetching session:", error);
  //       return;
  //     }

  //     if (session) {
  //       router.push("/dashboard");
  //     } else {
  //       router.push("/auth");
  //     }
  //   };

  //   checkUserAuth();

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (session) {
  //       router.push("/dashboard");
  //     } else {
  //       router.push("/auth");
  //     }
  //   });

  //   return () => {
  //     subscription?.unsubscribe();
  //   };
  // }, [router]);

  return (
    <>
      <div style={{ height: "100vh" }}>
        <iframe
          src="/landing/index.html"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Landing Page"
        />
      </div>
    </>
  );
}
