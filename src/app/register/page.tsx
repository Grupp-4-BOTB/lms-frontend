"use client"; // // Talar om för Next.js att detta är en Client Component,
//  vilket gör det möjligt att använda states och hooks

import React, { useState, Suspense } from "react";
import Button from "@/components/ui/Button";

// Next.js inbyggda verktyg för att navigera och läsa av URL-parametrar
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  // Initierar routern så att vi kan skicka användaren vidare
  // till inloggningen när registreringen är klar
  const router = useRouter();

  // ───  HÄMTA DATA FRÅN URL-STRÄNGEN ───
  // Aktiverar sökparametrar. Det gör att vi kan läsa av värden efter ett frågetecken i URL:en (t.ex. ?email=test@test.com)
  const searchParams = useSearchParams(); // Aktivera sökparametrar

  // Hämtar e-postadressen som skickades med från välkomstsidan.
  // Om den inte finns i URL:en sätter vi den till en tom sträng ("").
  // Jag skickade med e-posten som en sökparameter (query string) i URL:en från förra sidan. På den här sidan
  // använder jag Next.js-hooken useSearchParams() för att fiska upp den parametern via searchParams.get("email").
  // På så sätt slipper användaren skriva in sin e-post två gånge
  const email = searchParams.get("email") || "";

  // Skapa states för att fånga upp vad användaren skriver i formuläret
  // Skapar lokala tillstånd (states) för att samla in och lagra det användaren skriver i textfälten
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Sparar en boolean (true/false) om användaren har kryssat i villkoren eller inte
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  //  Funktionen som skickar datan till ditt C#-API
  // Denna funktion körs asynkront när användaren klickar på "Complete"-knappen
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Hindrar webbläsaren från att ladda om sidan

    //  Validering innan vi skickar till backend
    if (password !== confirmPassword) {
      alert("Lösenorden matchar inte!");
      return;
    }

    if (!agreeTerms) {
      alert("Du måste godkänna användarvillkoren!");
      return;
    }

    try {
      // ANROP TILL DITT C#-API (IdentityWebApi)
      // ASYNKRONT ANROP: Här skickar vi datan till  IdentityWebApi-backend i C#
      const response = await fetch("https://localhost:7059/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Paketerar om våra React-states till ett JSON-objekt som matchar er C# 'RegisterRequest'-DTO
          // JavaScript-objekt kan inte skickas direkt över internet till ett annat system. JSON.stringify förvandlar vårt dataobjekt i React till en rå textsträng i JSON-format. Det gör att vår C#-backend
          // enkelt kan ta emot texten och mappa om den till en C#-klass
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
        }),
      });

      if (response.ok) {
        alert("Registreringen lyckades! Sparad i databasen.");
        // Skickar användaren vidare till inloggningsskärmen automatiskt
        router.push("/login");
      } else {
        const errorData = await response.text();
        alert(
          `Fel vid registrering: ${errorData || "Kontrollera backend-koden."}`,
        );
      }
    } catch (error) {
      // Fångar upp nätverksfel, till exempel om har glömt att köra igång  mitt API-projekt i Visual Studio
      console.error("Nätverksfel till C#-API:et:", error);
      alert(
        "Kunde inte nå backend-servern. Är ditt Visual Studio-projekt igång?",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Vänster sida: Dekorativ bildbehållare */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-15">
        <div className="relative w-full h-[600px] bg-[#3D4754] rounded-3xl overflow-hidden">
          <img
            src="/shiko-logo-new.svg"
            alt="Shiko Logo"
            width={140}
            height={40}
            className="absolute top-8 left-8 z-10"
          />
          <div className="absolute top-8 left-8 z-10 text-white font-bold text-2xl flex items-center gap-2"></div>
          <img
            src="/welcome-photo.svg"
            alt="Background image"
            className="object-cover object-center scale-100 w-full h-full"
          />
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

        {/* 3. Koppla handleSubmit till formuläret här */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img
                  src="/user-icon.svg"
                  alt="User icon"
                  width={10}
                  height={20}
                  className="opacity-80"
                />
              </div>
              <input
                type="text"
                placeholder="Hasan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full p-3 border pl-10 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              placeholder="Mahmud"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            />
          </div>

          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-xs text-gray-500">
              I agree with{" "}
              <span className="text-orange-500 cursor-pointer">
                terms and conditions
              </span>
            </span>
          </div>
          <div className="w-full pt-4">
            {/* Vi använder en vanlig HTML-knapp med Tailwind-klasser för att behålla er orangea design */}
            <button
              type="submit" // Denna typ gör att hela formulärets onSubmit-funktion (handleSubmit) drar igång
              className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Complete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
