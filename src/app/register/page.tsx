"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Vänster sida: Dekorativ bildbehållare */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
        <div className="relative w-full h-[600px] bg-[#3D4754] rounded-3xl overflow-hidden flex items-center justify-center">
          <div className="absolute top-8 left-8 text-white font-bold text-2xl flex items-center gap-2">
            <span className="bg-white text-[#3D4754] px-2 py-0.5 rounded text-sm">
              s
            </span>{" "}
            Shiko
          </div>
          {/* Här visas den abstrakta bilden från image_9fcec5.png */}
          <div className="text-gray-400 text-center px-10"></div>
        </div>
      </div>

      {/* Höger sida: Registreringsformulär */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24">
        <h1 className="text-4xl font-bold text-[#0F172A] mb-4">Almost There</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Before you can sign in, you need to verify your profile information
          and set a strong password. For security reasons, your password must be
          at least 8 characters long.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <input
              type="text"
              placeholder="Hasan"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              placeholder="Mahmud"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-xs text-gray-500">
              I agree with{" "}
              <span className="text-orange-500 cursor-pointer">
                terms and conditions
              </span>
            </span>
          </div>
          <div className="w-full pt-4">
            <Link href="/verification">
            <Button variant="orange" size="lg">
              Complete
            </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
