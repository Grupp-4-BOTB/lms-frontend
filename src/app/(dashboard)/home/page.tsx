"use client";
import { useEffect, useState } from "react"; // Importerar inbyggda React-funktioner för att hantera livscykler och interna tillstånd (state)

export default function Home() {
  // Skapar lokala tillstånd (states) för att komponenten ska komma ihåg information och rita om sidan när informationen ändras:
  const [email, setEmail] = useState(""); // Sparar den inloggade användarens e-postadress (börjar som tom text)
  const [name, setName] = useState("User"); // Sparar den inloggade användarens namn (börjar som "User")
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Håller koll på om användaren är godkänd och inloggad (börjar som falskt)

  // useEffect körs helt automatiskt en gång så fort sidan har laddats klart i webbläsaren
  useEffect(() => {
    // Hämtar de sparade värdena och säkerhetsnyckeln från webbläsarens lokala minne (localStorage):
    const token = localStorage.getItem("accessToken");
    const savedEmail = localStorage.getItem("userEmail");
    const savedName = localStorage.getItem("userName");

    // Kontrollerar om det finns både en giltig säkerhetsnyckel (token) OCH ett sparat namn i webbläsaren
    if (token && savedName) {
      setIsLoggedIn(true); // Ändrar status till sann – användaren är officiellt inloggad i appen!
      setName(savedName); // Uppdaterar namnet i appens minne till det riktiga förnamnet som hämtades från databasen
      if (savedEmail) setEmail(savedEmail);
      if (savedName) setName(savedName);
    }
  }, []); // Den tomma arrayen [] gör att denna useEffect ENDAST körs en gång vid sidladdning, inte vid varje omrendering

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      {/* 1. HÄR LÄGGER VI IN HÄLSNINGEN MED DITT NAMN */}
      <h1 className="text-4xl font-bold">Welcome back, {name || "User"}!</h1>

      {/* 2. HÄR VISAS DIN MEJL OM DU ÄR INLOGGAD */}
      {isLoggedIn && (
        <p className="text-gray-500 bg-gray-100 px-4 py-2 rounded-lg text-sm">
          Inloggad som:{" "}
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      )}

      {/* 3. DIN FIL HAR REDAN DENNA RAD FRÅN DINA KOLLEGOR */}
      <p className="text-xl text-gray-400">Home Page</p>
    </div>
  );
}
