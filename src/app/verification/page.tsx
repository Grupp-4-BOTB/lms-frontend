"use client"; //krävs för useState
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useSearchParams } from 'next/navigation';    // TILLAGD FÖR EMAIL FÖR GABRIEL

export default function VerificationCodePage() {
  const searchParams = useSearchParams();             // TILLAGD FÖR EMAIL FÖR GABRIEL
  const email = searchParams.get('email') || "";      // TILLAGD FÖR EMAIL FÖR GABRIEL
  
  
  // TILLAGGD
  // State för att spara KODEN användaren skriver in
  const [code, setCode] = useState("");


  // TIMER KOD STARTAR HÄR FÖR 2 MIN (Men i sekunder, så 120)
  const [timeLeft, setTimeLeft] = useState(120);
  const [isExpired, setIsExpired] = useState(false);
  // TIMER KOD SLUT





  ///////////////// HANDLE-RESEND //////////////////
  // Denna genererar och skickar en helt ny verifieringskod till användarens mail
  const handleResend = async () => {
    // NOLLSTÄLLER TIMERN
    setTimeLeft(120);
    setIsExpired(false);
    setCode("");

    try {
      // ANROPAR BACKEND OCH GENERERAR NY KOD
      await fetch("https://webapp-backend-verificationCode.azurewebsites.net/api/verificationcode/resend", {
        method: "POST",
        headers: {
      "Content-Type": "application/json", //förklarar om det är en jsonfil, text, bild etc. Vilken typ av format det som skickas är. 
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string // NYCKEL för min backend, så att anropet faktiskt kommer igenom
    },
    body: JSON.stringify({ Email: email })                          // TILLAGD FÖR EMAIL FÖR GABRIEL
      });
    } catch (error) {
      console.error("Unable to send new code:", error);
    }
  };
// HÄMTA NY KOD FRÅN BACKEND, SLUT







// LOGIKEN SOM FÅR KLOCKAN ATT TICKA NEDÅT
      useEffect(() => {
        // Kollar om tiden är slut. om det är 0 stoppas klockan.
        if (timeLeft <= 0) {
          setIsExpired(true);
          return;
        }
        
        // Minskar med 1 sekund varje sekund
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1); 
        }, 1000);


        // Rensar timern när komponenten laddas ur eller startar om
        return () => clearInterval(timer);
      }, [timeLeft]);
// LOGIKEN SOM FÅR KLOCKAN ATT TICKA NEDÅT, SLUT


  // SJÄLVASTE KLOCKAN/timern
        const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0'); // RÄKNAR MINUTERNA
        const s = (seconds % 60).toString().padStart(2, '0');           // RÄKNAR SEKUNDERNA
        return `${m}:${s}`;                                             // Sätter ihop allt till en färdig klocka (I mitt fall "02:00").
      };
  // KLOCKAN, SLUT






  ///////////////// HANDLE-VERIFY //////////////////
  // skickar in koden som användaren har skrivit in på hemsidan, för att kontrollera om den är rätt eller fel
  const handleVerify = async () => {
    if (isExpired) return;
    await fetch("https://webapp-backend-verificationCode.azurewebsites.net/api/verificationcode/verify", {
      method: "POST",
      headers: {
      "Content-Type": "application/json", //förklarar om det är en jsonfil, text, bild etc. Vilken typ av format det som skickas är. 
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string // NYCKEL för min backend, så att anropet faktiskt kommer igenom
    },
      body: JSON.stringify({ Email: email, Code: code })              // TILLAGD FÖR EMAIL FÖR GABRIEL
    });
  };
   // SKICKAR KODEN TILL MITT API, AVSLUT
  
  





  return (
    // min-h-screen gör att sidan tar upp hela skärmens höjd, flex delar upp den i två halvor
    <div className=" min-h-screen bg-[var(--background-color)] flex justify-center p-10">


      {/* VÄNSTER */}
      <div className="w-1/3 flex flex-col justify-center bg-white rounded-l-2xl">

        <div className="relative w-full">
          <img
            src="/verification-img.svg"
            alt="side picture for verification page"
            className=" w-full h-auto object-contain ml-5"
          />
        </div>
      </div>





      {/* HÖGER */}
      <div className="w-1/2 flex flex-col justify-center p-20 bg-white rounded-r-2xl">
        <h1 className="text-4xl font-bold mb-2">Verification Needed</h1>
        <p className="text-gray-600 mb-6"> Please verify your account with the verification code that has been sent to your specified email address.</p>
    <div className="flex-col justify-center max-w-md items-center">
      <label className="text-sm font-medium text-gray-700">Enter verification Code</label>
      
      <input 
        type="text" 
        placeholder="Enter 7-digit code" 
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none transition-all bg-gray-50"
      />
    </div>





{/* DESIGN FÖR TIMER  */}
  <div className="flex justify-between items-center gap-4 pt-5 pb-10">
    {/* VISAR TIDEN OCH KODEN, ELLER OM 2 MIN HAR PASSERAT */}
      <div className={`text-xs ${isExpired ? "text-red-500 font-bold" : "text-[#AAA]"}`}>
        {isExpired ? "Code has expired" : `New code can be sent in: ${formatTime(timeLeft)}`}
      </div>

          {/* NOLLSTÄLLER TIMERN NÄR MAN KLICKAR */}
              <div 
              onClick={handleResend}
              className="underline text-[var(--accent-color)] font-bold cursor-pointer text-xs"
              >
                  Resend verification code
              </div>
          </div>
{/* // DESIGN FÖR TIMER SLUT */}






        
        <button 
        onClick={handleVerify}
        className="w-full px-4 py-2 text-sm font-medium flex justify-center text-white bg-[var(--accent-color)] hover:bg-[var(--hover-accent-color)] rounded-md transition-colors cursor-pointer">
            Continue
        </button>
      </div>

    </div>
  )
}