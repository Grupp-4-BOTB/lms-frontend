import Link from "next/link";

export default function NotFound() {
  return (
    // bg-[#1a202c] matchar den mörkblå/grå färgen på bilden
    <div className="min-h-screen bg-[#1a202c] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-xl w-full">
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
        <Link
          href="/"
          className="inline-block bg-[#ff5a3d] hover:bg-[#e54e35] text-white font-medium py-3 px-8 rounded-md transition-all duration-200"
        >
          Back to Home ↗
        </Link>
      </div>
    </div>
  );
}
