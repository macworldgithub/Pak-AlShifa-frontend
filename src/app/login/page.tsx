"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        identifier: email,
        password,
      });

      // Axios automatically throws for non-2xx responses
      const { access_token, user } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user_role", user.role);
      localStorage.setItem("user_name", user.fullName || user.username); // Store name
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.response?.status === 401 || err.response?.status === 400) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side - Decorative Image */}
        <div className="hidden lg:flex items-center justify-center bg-[#1F2858] p-12">
          <Image
            src="/images/guide.png"
            alt="Clinic Guide"
            width={500}
            height={400}
            className="object-contain"
            priority
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo & Tagline */}
            <div className="text-center">
              <Image
                src="/images/logo.png"
                alt="Clinic Logo"
                width={350}
                height={80}
                className="mx-auto h-20 w-auto"
                priority
              />
              <p className="mt-3 text-sm font-medium text-gray-600">
                Efficient, Organized, Reliable
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F2858] focus:border-transparent text-black"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className=" text-black mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F2858] focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <p className="text-center text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
              

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#1F2858] focus:ring-[#1F2858]"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
                <a
                  href="#"
                  className="font-medium text-[#68A95F] hover:text-[#5a8f4f]"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-medium text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1F2858] hover:bg-[#162248] active:scale-95"
                }`}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
