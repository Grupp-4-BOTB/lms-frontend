"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoogleButton from "@/components/ui/GoogleButton";

import Button from "@/components/ui/Button";

export default function LoginPage() {
  // // Sparar det som användaren skriver i e-postfältet
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  Håller koll på vilken vy som visas: 1 = Ange e-post (Welcome), 2 = Ange lösenord (Enter Password)
  const [step, setStep] = useState(1);
  // Visar en laddningssnurra eller ändrar text på knapparna under pågående API-anrop
  const [loading, setLoading] = useState(false);
  // Next.js router för att kunna skicka användaren till en annan sida (t.ex. /home) efter lyckad inloggning
  const router = useRouter();
  // Nya Koden
  // STEGHANTERING (KONTROLLERA E-POST VIA C# API OCH VALSÄTT VÄG)
  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault(); // Stoppar sidan från att laddas om

    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    setLoading(true); // Startar laddningsläge ("Checking..." visas på knappen)

    try {
      // ANROP TILL DITT C#-API FÖR ATT KONTROLLERA OM E-POSTEN FINNS I AZURE
      const response = await fetch(
        "https://shiko-identity-webbapi-gyg4cfe3gshmeabt.germanywestcentral-01.azurewebsites.net/api/Auth/check-email",
        // "https://localhost:7113/api/Auth/check-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }), // Skickar e-posten till C#
        },
      );

      if (response.ok) {
        const data = await response.json();

        if (data.exists) {
          // SCENARIO A: Användaren finns i Azure -> Visa lösenordsfältet (Step 2)
          setStep(2);
        } else {
          // SCENARIO B: Användaren finns INTE -> Skicka direkt till "Almost There" (Register)
          // Vi skickar med e-posten i URL:en så att RegisterForm.tsx kan läsa av den!
          router.push(`/register?email=${email}`);
        }
      } else {
        alert("Something went wrong with the email check. Please try again.");
      }
    } catch (error) {
      console.error("Nätverksfel vid kontroll av e-post:", error);
      alert(
        "Network error! Could not reach backend. Is Visual Studio running?",
      );
    } finally {
      setLoading(false); // Stänger av laddningsstatusen
    }
  };

  // STEGHANTERING (FRÅN E-POST TILL LÖSENORD)
  //const handleNextStep = (e: React.FormEvent) => {
  // e.preventDefault(); // Stoppar sidan från att laddas om (standardbeteende för formulär)

  // if (!email) {
  //   alert("Please enter an email address.");
  //   return;
  // }

  // Skicka användaren direkt till nästa steg (lösenordsvyn)
  // setStep(2);
  //  };

  // API-ANROPET (INLOGGNINGEN)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Stoppar sidomladdning
    setLoading(true); // // Sätter laddningsstatus till true (knappen ändras till "Signing in..

    try {
      // ANROP TILL DITT C#-API FÖR LOGIN
      // Här gör vi ett asynkront HTTP POST-anrop (fetch) till vår C# / .NET Core-backend!
      const response = await fetch(
        //"https://localhost:7113/api/Auth/login", // Ändra till din faktiska backend-URL och endpoint
        "https://shiko-identity-webbapi-gyg4cfe3gshmeabt.germanywestcentral-01.azurewebsites.net/api/Auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email, // Skickar med e-posten från vårt React-state
            password: password, // Skickar med lösenordet från vårt React-state
          }),
        },
      );
      // Om backend svarar med HTTP status 200-299 (Lyckad inloggning!)
      if (response.ok) {
        const data = await response.json();

        console.log("Svar från C#-backend:", data);
        // Säkerhetsställer att vi hittar token och namn oavsett exakt vad C#-objektets properties heter
        // Den här raden kollar om token ligger i data.token, data.accessToken eller data.tokenString
        const actualToken =
          data.token || data.accessToken || data.tokenString || data;
        const actualName =
          data.firstName ||
          data.name ||
          data.Name ||
          data.username ||
          data.fullName ||
          "User";

        // SPARAR INFO I WEBBLÄSAREN SÅ VI KAN VISA VEM SOM ÄR INLOGGAD!
        // LOCAL STORAGE (SPARA SESSIONEN)
        // Vi sparar vår JWT-token och användarinfo lokalt i webbläsaren
        // Det gör att appen kommer ihåg att vi är inloggade även om vi laddar om sidan!
        localStorage.setItem("accessToken", actualToken);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", actualName);

        alert(`Welcome back! Logged in as: ${email}`);

        // Skicka vidare till instrumentpanelen/hemsidan
        router.push("/home");
      } else {
        // Om backenden skickar ett felmeddelande (t.ex. HTTP 401 Unauthorized)
        const errorText = await response.text();
        alert(`Login failed: ${errorText || "Invalid email or password."}`);
      }
    } catch (error) {
      console.error("Nätverksfel vid inloggning:", error);
      alert(
        "Network error! Could not reach backend. Is Visual Studio running?",
      );
    } finally {
      setLoading(false); // Stänger av laddningsstatusen när allt är klart
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Vänster sida: Bilden från Figma */}
      <div className="hidden lg:flex w-1/2 bg-white items-center justify-center p-12">
        <div className="relative w-full h-[600px] bg-[#3D4754] rounded-3xl overflow-hidden">
          <img
            src="/welcome-photo.svg"
            alt="Background image"
            className="object-cover object-center scale-100 w-full h-full"
          />

          {/* Här kan du lägga in din Shiko-logga */}
          <div className="absolute top-8 left-8 text-white font-bold text-2xl flex items-center gap-2">
            <img
              src="/shiko-logo-new.svg"
              alt="Shiko Logo"
              width={140}
              height={40}
            />
            {/*<span className="bg-white text-[#3D4754] p-1 rounded">S</span> Shiko*/}
          </div>
          {/* Dekorativt mönster likt image_bc7cea.png */}
          <div className="absolute inset-0 opacity-20 bg-[url('/pattern.png')] bg-cover"></div>
        </div>
      </div>

      {/* Höger sida: Formuläret */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-12 md:px-24">
        <div className="max-w-md w-full">
          {step === 1 ? (
            <form onSubmit={handleNextStep}>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
              <p className="text-gray-500 mb-8">
                Please log in to your account to continue.
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>

              {/* Denna div blir den nya ramen runt både ikon och input */}

              <div className="relative w-full">
                {/* 1. Ikonen läggs "ovanpå" fältet till vänster */}
                <div className="absolute inset-y-0 left-0 flex items-center mb-5 pl-3 pointer-events-none">
                  <Image
                    src="/user-icon.svg"
                    alt="User icon"
                    width={14}
                    height={20}
                    className="text-gray-400"
                  />
                </div>

                <input
                  type="email"
                  autoComplete="off"
                  placeholder="Type your email address"
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-orange-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="text-xs text-orange-500  underline decoration-orange-500  hover:underline font-medium cursor-pointer"
                  onClick={() =>
                    alert(
                      "Här kan du lägga till logik för att återställa e-post",
                    )
                  }
                >
                  Forgot your email address?
                </button>
              </div>

              <div className="w-full py-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer disabled:bg-gray-400"
                >
                  {loading ? "Checking..." : "Continue"}
                </button>
              </div>

              {/* ─── HÄR LÄGGER DU IN LINJEN OCH GOOGLE-KNAPPEN ─── */}
              <div className="w-full text-center my-2">
                {/* Själva linjen med texten "or continue with" */}
                <div className="relative flex py-4 items-center justify-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-wider">
                    or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Google-knappen placeras direkt under linjen */}
                <div className="mt-8 [&_button]:cursor-pointer">
                  <GoogleButton />
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Enter Password
              </h1>
              <p className="text-gray-500 mb-8">
                Please enter your password to log in.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-400">
                  {email}
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Type your password"
                className="w-full p-3 border border-gray-200 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="w-full py-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white font-medium py-3 px-6 rounded-lg transition-colors
                     ${
                       loading
                         ? "bg-green-500 cursor-not-allowed"
                         : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                     }`}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
