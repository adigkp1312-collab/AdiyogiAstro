"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { LogoIcon } from "@/components/shared/logo-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setError("Failed to sign in with Google.");
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF5] px-4">
      <Card className="w-full max-w-md border border-gray-200 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Orange accent top border */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF6600] to-[#FF8C00]" />

        <CardHeader className="items-center text-center">
          <div className="mb-2 flex items-center gap-2">
            <LogoIcon className="size-8" />
            <span className="text-2xl font-bold tracking-tight text-[#FF6600]">
              AstroPath
            </span>
          </div>
          <CardTitle className="text-xl text-gray-900">Welcome back</CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to your account to continue your cosmic journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 w-full bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-sm font-bold text-white shadow-md hover:from-[#e65c00] hover:to-[#FF6600]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="h-10 w-full border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50"
          >
            {isGoogleLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <svg className="size-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Sign in with Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-[#FF6600] hover:text-[#e65c00] hover:underline"
            >
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
