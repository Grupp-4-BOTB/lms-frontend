"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Button from "@/components/ui/Button";

export default function LoginMockPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // För att hantera de två stegen i Figma
  const router = useRouter();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "hasan@gmail.com") {
      setStep(2); // Gå till lösenord om e-posten stämmer
    } else {
      alert("Använd hasan@gmail.com för att testa!");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") {
      router.push("/home"); // Skicka vidare till Home/Dashboard vid rätt lösenord
    } else {
      alert("Fel lösenord! Testa 1234");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Vänster sida: Bilden från Figma */}
      <div className="hidden lg:flex w-1/2 bg-white items-center justify-center p-12">
        <div className="relative w-full h-[600px] bg-[#3D4754] rounded-3xl overflow-hidden">
          {/* Här kan du lägga in din Shiko-logga */}
          <div className="absolute top-8 left-8 text-white font-bold text-2xl flex items-center gap-2">
            <span className="bg-white text-[#3D4754] p-1 rounded">S</span> Shiko
          </div>
          {/* Dekorativt mönster likt image_bc7cea.png */}
          <div className="absolute inset-0 opacity-20 bg-[url('/pattern.png')] bg-cover"></div>
        </div>
      </div>

      {/* Höger sida: Formuläret */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-12 md:px-24">
        <div className="max-w-md w-full">
          {step === 1 ? (
            <form onSubmit={handleNextStep}>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
              <p className="text-gray-500 mb-8">
                Please log in to your account to continue.
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>

              {/* Denna div blir den nya ramen runt både ikon och input */}

              <div className="relative w-full">
                {/* 1. Ikonen läggs "ovanpå" fältet till vänster */}
                <div className="absolute inset-y-0 left-0 flex items-center mb-5 pl-3 pointer-events-none">
                  <Image
                    src="/user-icon.svg"
                    alt="User icon"
                    width={14}
                    height={20}
                    className="text-gray-400"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Type your email address"
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-orange-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="text-xs text-orange-500  underline decoration-orange-500  hover:underline font-medium cursor-pointer"
                  onClick={() =>
                    alert(
                      "Här kan du lägga till logik för att återställa e-post",
                    )
                  }
                >
                  Forgot your email address?
                </button>
              </div>

              <div className="w-full py-4">
                <Button variant="orange" size="lg">
                  Continue
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Enter Password
              </h1>
              <p className="text-gray-500 mb-8">
                Please enter your password to log in.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-400">
                  {email}
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Type your password"
                className="w-full p-3 border border-gray-200 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="w-full py-4">
                <Button variant="orange" size="lg">
                  Sign In
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
