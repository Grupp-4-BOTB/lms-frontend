"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  // Skapar en asynkron funktion för utloggning som lyssnar på ett klick-event
  const handleLogOut = async (e: React.MouseEvent) => {
    // Stoppar länkens standardbeteende så att sidan inte laddas om direkt innan vi är klara
    e.preventDefault();
    // Hämtar användarens e-postadress som sparades i webbläsarens lokala minne vid inloggningen
    const userEmail = localStorage.getItem("userEmail");
    // Kontrollerar om vi faktiskt hittade en e-postadress i localStorage innan vi går vidare
    if (userEmail) {
      try {
        // Startar ett asynkront anrop (POST-request) till vårt C#-API och väntar (await) på svar
        await fetch(
          "https://shiko-identity-webbapi-gyg4cfe3gshmeabt.germanywestcentral-01.azurewebsites.net/api/Auth/logout",
          //"https://localhost:7113/api/Auth/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // Omvandlar vårt JavaScript-objekt med Email till en JSON-sträng som skickas i body
            body: JSON.stringify({ Email: userEmail }),
          },
        );
      } catch (error) {
        console.error("Fel vid anrop till logout-endpoint:", error);
      }
      // Rensar bort vår JWT-token (access token) från webbläsarens lokala minne
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      // Skickar användaren tillbaka till inloggningssidan nu när allt är rensat i både databasen och webbläsaren
      window.location.href = "/login";
    }
  };

  return (
    <>
      <aside className="fixed top-5 left-5 bottom-5 w-64 flex flex-col gap-5 shrink-0 z-50">
        {/* 1. VÄNSTER NAVBAR, SHIKO LOGGA */}
        <Link className="bg-white border border-gray-200 p-4 h-17 rounded-lg" href="/courses">
          <Image
            src="/shikologo.svg"
            alt="SHIKO logo"
            width={143}
            height={35}
          />
        </Link>

        {/* 2. VÄNSTER NAVBAR */}
        <div className="flex-1 bg-white border border-gray-200 p-4 rounded-lg flex flex-col">
          <nav className="flex-1 space-y-1">
            <div className="text-[#AAA] py-2"> Menu </div>

            {/* <Link
              href="/home"
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/dashboard-icon.svg" alt="" width={30} height={30} />
              Dashboard
            </Link> */}

            <Link
              href="/courses"
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/course-icon.svg" alt="" width={30} height={30} />
              Courses
            </Link>

            {/* <Link
              href="/dashboard"
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/calendar-icon.svg" alt="" width={30} height={30} />
              Calendar
            </Link> */}

            <Link
              href="/liveclass"
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/liveclass-icon.svg" alt="" width={30} height={30} />
              Live Classes
            </Link>

            <div className="text-[#AAA] py-2"> General </div>

            <Link
              href="/profile/general"
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/profile-icon.svg" alt="" width={30} height={30} />
              Profile
            </Link>

            {/* <Link
              href="/dashboard"
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/profile2-icon.svg" alt="" width={30} height={30} />
              Profile
            </Link> */}

            {/* <Link
              href="/register"
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/settings-icon.svg" alt="" width={30} height={30} />
              Settings
            </Link> */}

            {/* <Link
              href="/emailverification"
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/helpcenter-icon.svg" alt="" width={30} height={30} />
              Help Center
            </Link> */}

            <Link
              href="/dashboard"
              onClick={handleLogOut}
              className="flex items-center gap-3 p-2 rounded-l-full transition-all hover:bg-orange-50 hover:text-orange-600 group"
            >
              <Image src="/logout-icon.svg" alt="" width={30} height={30} />
              Log Out
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
