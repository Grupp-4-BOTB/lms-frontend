"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";


export default function NotFound() {
  const router = useRouter();

  return (
    // bg-[#1a202c] matchar den mörkblå/grå färgen på bilden
      <div className="flex-1 min-h-screen bg-[var(--primary-color)] flex flex-col items-center justify-center text-center p-8">
        
        {/* Illustrationen/Grafiken */}
        <div className="relative mb-8">
          <img
            src="/404-photo.svg"
            alt="404 llustration"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* Textinnehåll */}
        <h2 className="text-white text-3xl font-bold mb-2">Page Not Found!</h2>
        <p className="text-gray-400 text-sm mb-8">
          Sorry, the page you are looking for doesn't exist or has been removed.
          <br />
          Keep exploring out site.
        </p>

        {/* Orange knapp */}
      <Button onClick={() => router.push("/home")}>
        Back to Home
      </Button>
      </div>
  );
}
