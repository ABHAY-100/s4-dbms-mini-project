"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MailChecker from 'mailchecker';

export function AuthForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
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
      }
    };

    checkUserAuth();
  }, [router]);

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the email before proceeding
    if (!MailChecker.isValid(email)) {
      alert("Temporary email addresses are not allowed.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      alert("Error sending magic link: " + error.message);
    } else {
      alert("Check your email for the magic link!");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to DeathSet</CardTitle>
          <CardDescription>Please sign in or sign up below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMagicLinkLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Continue with Email
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                Sign In with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
