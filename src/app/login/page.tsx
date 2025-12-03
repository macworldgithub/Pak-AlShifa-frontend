'use client'; // Client for router
import Image from "next/image";
import { useRouter } from "next/navigation"; // For redirect

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login (replace with real auth, e.g., API call)
    console.log('Logging in...');
    router.push('/dashboard'); // Redirect to dashboard on success
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left side with background image */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1F2858] items-center justify-center p-12">
        <div className="relative w-full max-w-md">
          <div className="p-8">
            <div className="relative w-full h-64">
              <Image
                src="/images/guide.png"
                alt="Background"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={350}
                height={70}
                className="h-20 w-auto"
                priority
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Efficient, Organized, Reliable
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#68A95F] hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1F2858] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-[#162248]"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}