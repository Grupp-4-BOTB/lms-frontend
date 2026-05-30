"use client"
import React, { useState, useEffect } from 'react'
import Members from '@/components/groupmembers/Members';
import ProfileRouting from '@/components/ui/ProfileRouting'
import Image from "next/image";

export default function Teams() {
const [recipientEmail, setRecipientEmail] = useState("");
const [profilePic, setProfilePic] = useState<string>("/defaultprofile.svg");

//Brevbäraren som skickar iväg datan - I DETTA FALLET MAILET SOM SKRIVS I PLACEHOLDERN - till din backend
const sendInvite = (email: string) => {
  fetch("https://webapp-backend-emailrequest-hcdcgva6baawcheb.polandcentral-01.azurewebsites.net/api/emailrequest/emailinvite", { 
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string //NYCKEL
    }, 
    body: JSON.stringify({ 
      recipientEmail: email,
    })
  })
.then(() => setRecipientEmail("")); // RENSAR BORT EMAILEN FRÅN PLACEHOLDERN NÄR DET SKICKATS
};








//MOCK FÖR ATT RADERA GROUP - BÖRJAN
const [members, setMembers] = useState([
    { id: '1', name: 'Johan Nilsson', role: 'Student' },
    { id: '2', name: 'Kalle Karlsson', role: 'Student' },
    { id: '3', name: 'Anna Andersson', role: 'Student' },
    { id: '4', name: 'Erik Eriksson', role: 'Teacher' },
]);
// ISTÄLLET FÖR MOCK-DELEN OVAN
//const [members, setMembers] = useState<{ id: string; name: string; role: string }[]>([]);





React.useEffect(() => {
  /*fetch("https://webapp-backend-emailrequest-hcdcgva6baawcheb.polandcentral-01.azurewebsites.net/api/Members/groups/4", {  //ÄNDRA TILL API AZURE WEBAPP 
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string // NYCKEL för min backend, så att anropet faktiskt kommer igenom
    }
  })
  .then(res => (res.ok && res.status !== 204 ? res.json() : [])) // LAGT EN TILLFÄLLIG SPÄRR JUST PGA ATT JAG INTE HAR EN DATABAS. DEN BARA HINDRAR SYSTEMET FRÅN ATT KRASCHA DÅ DET EJ FINNS ANVÄNDARE
  //.then(res => res.json())
  .then(data => setMembers(data))
  .catch(err => console.error("Fel vid hämtning:", err));
  */
}, []);
// ISTÄLLET FÖR MOCK-DELEN OVAN, AVSLUT



// Statet som håller koll på vilka ID:n som är ikryssade
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 2. Logik för att kryssa i/ur en person
  const handleSelectMember = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 3. Logik för att radera en person
  const handleDeleteMember = (id: string) => {
  // Om personen INTE är ikryssad i checkboxen, gör ingenting (avbryt)
  if (!selectedIds.includes(id)) {
    alert("Please, fill in the checkbox to be able to delete the person.");
    return;
  }




  // RADERAR PERSONEN FRÅN GRUPPEN I DATABASEN PÅ RIKTIGT
  /*fetch(`https://webapp-backend-emailrequest-hcdcgva6baawcheb.polandcentral-01.azurewebsites.net/api/Members/${id}`, { //ÄNDRA TILL API AZURE WEBAPP 
  method: "DELETE",
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string //NYCKEL 
  }
})
.then(res => {
  if (res.ok) {*/
    // Om borttagningen lyckades i databasen ELLER mock, TA BORT ANVÄNDARE FRÅN SKÄRMEN:
    setMembers(prev => prev.filter(m => m.id !== id));
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    /*}
  });
  */
};
  // RADERAR PERSONEN FRÅN GRUPPEN I DATABASEN, AVSLUT



  return (
<>

<div className="font-bold text-[45px] px-4">Team</div>

      {/* 1. ROUTING - Helt fristående och fri från resten av koden */}
      <div className="w-1/2 px-2">
        <ProfileRouting />
      </div>


<div className="p-6 flex items-start justify-between gap-8">

{/* 1. VÄNSTER SIDA */}
<div className="max-w-md w-1/3 flex flex-col gap-1">
        <div className="font-semibold text-lg">Invite team member</div>
        <div className="text-gray-500">Get your study group up and running faster by inviting your team to collaborate</div>
      </div>


{/* 1. HÖGER SIDA */}
<div className="bg-white p-10 rounded-[30px] flex flex-col gap-5 w-2/3"> 

<div className="flex gap-5 w-full">
        <div className="relative w-full flex items-center">
          <Image src="/envelope.svg" alt="" width={18} height={18} className="absolute left-4 pointer-events-none" />
          <input
            type="email" 
            placeholder="name@example.com" 
            value={recipientEmail} // 
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full p-2 pl-11 border border-gray-300 rounded-[11px] focus:outline-none focus:border-orange-500"
          />
        </div>


        {/* 1. KNAPP */}
        <button 
        onClick={() => sendInvite(recipientEmail)} //När vi trycker på send invite, skickas allt över till vår controller i backend
        className="bg-[#ED5735] hover:bg-[#d44828] text-white font-medium py-2 px-6 pl-2 rounded-[11px] whitespace-nowrap cursor-pointer flex items-center gap-2">
         <Image src="/envelopewhite.svg" alt="" width={15} height={15} className="cursor-pointer" />
            Send Invite
        </button>
    </div>


        </div>
        </div>







<div className="p-6 flex items-start justify-between gap-8">

{/* 2. VÄNSTER SIDA */}
<div className="max-w-md w-1/3 flex flex-col gap-1">
        <div className="font-semibold text-lg">Team members</div>
        <div className="text-gray-500">Manage your existing team and change roles/ permissions.</div>
      </div>


{/* 2. HÖGER SIDA */}
<div className="bg-white p-10 rounded-[30px] flex flex-col gap-5 w-2/3"> 

<div className="grid grid-cols-2 w-full ">
    <div className="pb-3">Name</div>

<div className="flex items-center gap-2">
  <div className="pb-3">Role</div>

  <div className="relative group flex items-center">
    <Image src="/questionmark.svg" alt="" width={15} height={15} className="cursor-pointer pb-3" />
  
      <div className="hidden group-hover:block absolute left-full ml-2 bg-white z-10 text-xs rounded-[5px] py-1 px-2 border border-gray-200 text-black w-37.5">
          Displays the member's current role or position within the team.
      </div>
    </div>
  </div>
</div>






{/* TEAM MEMBERS - ANVÄNDER NU COMPONENTEN */}
{members.map(member => (
  <Members 
    key={member.id}
    name={member.name}
    role={member.role}
    isChecked={selectedIds.includes(member.id)}
    onCheckChange={() => handleSelectMember(member.id)}
    onDelete={() => handleDeleteMember(member.id)}
  />
))}
{/* END */}


      </div>
    </div>
  </>
)
}