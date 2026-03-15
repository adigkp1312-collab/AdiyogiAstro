"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { LogoIcon } from "@/components/shared/logo-icon";
import { z } from "zod";
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

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [generalError, setGeneralError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleChange(field: keyof RegisterFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGeneralError(null);
    setErrors({});

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setGeneralError(data.message || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setGeneralError("Account created but sign-in failed. Please login manually.");
        router.push("/login");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setGeneralError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF5] px-4 py-12">
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
          <CardTitle className="text-xl text-gray-900">Create your account</CardTitle>
          <CardDescription className="text-gray-500">
            Begin your journey through the stars
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {generalError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {generalError}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="h-10 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

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
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-10 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
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
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="h-10 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className="h-10 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 w-full bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-sm font-bold text-white shadow-md hover:from-[#e65c00] hover:to-[#FF6600]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#FF6600] hover:text-[#e65c00] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
