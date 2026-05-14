import React from 'react'
import Link from "next/link";

export default function VerificationCodePage() {
  return (
    // min-h-screen gör att sidan tar upp hela skärmens höjd, flex delar upp den i två halvor
    <div className="flex min-h-screen w-full p-4 bg-gray-100">
      



      {/* VÄNSTER */}
      <div className="w-1/2 flex flex-col items-start justify-center bg-white rounded-l-2xl">

        <div className="relative w-full">
          <img
            src="/verification-img.svg"
            alt="side picture for verification page"
            className="h-[93vh] object-contain ml-0 object-left"
          />
        </div>
      </div>





      {/* HÖGER */}
      <div className="w-1/2 flex flex-col justify-center p-5 bg-white rounded-r-2xl">
        <h1 className="text-2xl font-bold mb-2">Verification Needed</h1>
        <p className="text-gray-600 mb-6"> Please verify your account with the verification code that has been sent to your specified email address.</p>

            
    <div className="flex-col justify-center items-center">
      <label className="text-sm font-medium text-gray-700">Enter verification Code</label>
      <input 
        type="text" 
        placeholder="Enter 7-digit code" 
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none transition-all bg-gray-50"
      />
    </div>







  <div className="flex justify-between items-center gap-4 pt-5 pb-10">
      <div className="text-[var(--accent-color)] text-xs">
        Contact Support
      </div>
    <div className="underline text-[var(--accent-color)] font-bold cursor-pointer text-xs">
        Resend verification code
    </div>
</div>



        <Link href="/verification">
        <button className="w-full px-4 py-2 text-sm font-medium flex justify-center text-white bg-[var(--accent-color)] hover:bg-[var(--hover-accent-color)] rounded-md transition-colors cursor-pointer">
            Continue
        </button>
      </Link>
      </div>

    </div>
  )
}