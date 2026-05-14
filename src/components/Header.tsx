import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* 2. TOPPEN RUTAN, NAVBAR */}

      {/* 2. TOPPEN RUTAN */}
      <header className="fixed top-5 left-[295px] right-5 h-17 bg-white z-50 border border-gray-200 rounded-lg flex items-center justify-end px-8">
        <div className="flex items-center gap-4">

          <Link href="/login-mock">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[var(--accent-color)] hover:text-white transition-colors rounded-md cursor-pointer">
            Log in
          </button>
      </Link>




          <Link href="/register">
            <button className="px-4 py-2 text-sm font-medium text-white bg-[var(--accent-color)] hover:bg-[var(--hover-accent-color)] rounded-md transition-colors cursor-pointer">
              Become member
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
