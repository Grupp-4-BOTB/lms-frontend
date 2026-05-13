import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>

  <aside className="sticky top-5 ml-5 my-5 w-64 flex flex-col gap-5 shrink-0">


  {/* 1. VÄNSTER NAVBAR, SHIKO LOGGA */}
  <div className="bg-white border border-gray-200 p-4 h-17 rounded-lg">
    <Image src="/shikologo.svg" alt="SHIKO logo" width={143} height={35} />
  </div>

  {/* 2. VÄNSTER NAVBAR */}
  <div className="flex-1 bg-white border border-gray-200 p-4 rounded-lg flex flex-col">
    <nav className="flex-1 space-y-1">

<div className="text-black-600 py-2"> Menu </div>

<Link href="/home" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
  <Image src="/dashboard-icon.svg" alt="" width={30} height={30} />
  Dashboard
</Link>

<Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
    <Image src="/course-icon.svg" alt="" width={30} height={30} />
        Courses
    </Link>

<Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
    <Image src="/calendar-icon.svg" alt="" width={30} height={30} />
        Calendar
    </Link>

<Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
    <Image src="/liveclass-icon.svg" alt="" width={30} height={30} />
        Live Classes
    </Link>

<div className="text-black-600 py-2"> General </div>

<Link href="/profile" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
    <Image src="/profile-icon.svg" alt="" width={30} height={30} />
        Profile
  </Link>

<Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
    <Image src="/profile2-icon.svg" alt="" width={30} height={30} />
        Profile
  </Link>

<Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
    <Image src="/settings-icon.svg" alt="" width={30} height={30} />
        Settings
  </Link>

<Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
    <Image src="/helpcenter-icon.svg" alt="" width={30} height={30} />
        Help Center
  </Link>

<Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group">
    <Image src="/logout-icon.svg" alt="" width={30} height={30} />
        Log Out
  </Link>


        </nav> 
    </div>
</aside>


    </>
  );
}