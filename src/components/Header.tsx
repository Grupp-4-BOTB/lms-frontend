"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function Header() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        // Vi berättar för TypeScript att decoded får innehålla vad som helst (any)
        const decoded = jwtDecode<any>(token);

        // Hämtar e-posten från mitt .NET-system säkert
        // Skapar en konstant variabel för e-postadressen genom att leta på två olika ställen i den avkodade tokensträngen
        const email =
          // Kollar om det finns en enkel, standardiserad egenskap som heter rakt av "email"
          decoded.email ||
          // Om "decoded.email" är tom, används ELLER-tecknen (||) för att hämta värdet från .NET-systemets
          // långa standardnamn för e-post-claims
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];

        if (email) {
          setUserEmail(email);
          setIsLoggedIn(true); // HÄR ÄR RÄTT FUNKTION!
        }
      } catch (error) {
        console.error("Kunde inte läsa token:", error);
      }
    }
  }, []);

  return (
    <>
      {/* 2. TOPPEN RUTAN */}
      <header className="fixed top-5 left-[295px] right-5 h-17 bg-white z-50 border-b flex justify-between items-center px-6">
        {/* Vänsterdel inuti headern (Här kan ni ha sökfält eller titel) */}
        <div></div>

        {/* Högerdel: Här styrs knapparna dynamiskt! */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            // SVAR A: Om användaren ÄR inloggad -> Visa bara e-posten snyggt
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-800">
                {userEmail}
              </span>
              <span className="text-xs text-green-600 font-semibold">
                Inloggad
              </span>
            </div>
          ) : (
            // SVAR B: Om användaren INTE är inloggad -> Visa era exakta knappar från bilden!
            <>
              {/* Länkar till er inloggningssida */}
              <Link href={isLoggedIn ? "/home" : "/login"}>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors  ${
                    isLoggedIn
                      ? "bg-green-500 text-white cursor-pointer hover:bg-green-600" // Grön stil om inloggad
                      : "text-gray-700 hover:bg-gray-50 cursor-pointer" // Grå stil om utloggad
                  }`}
                >
                  {isLoggedIn ? "Inloggad ✓" : "Log in"}
                </button>
              </Link>

              <Link href="/register">
                <button className="px-4 py-2 text-sm font-medium text-white bg-[#FF6B35] hover:bg-[#6A1B9A] rounded-lg transition">
                  Become member
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}
