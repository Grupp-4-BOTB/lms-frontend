"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import Members from '@/components/groupmembers/Members';
import ProfileRouting from '@/components/ui/ProfileRouting'
import Image from "next/image";

export default function Teams() {
const params = useParams();           // HÄMTAR  UT ALLA PARAMS
const groupId = params.id as string; // SKAPAR VARIABELN GROUPID EFTERSOM DEN INTE FUNKADE ANNARS
const [recipientEmail, setRecipientEmail] = useState("");
const [errorMessage, setErrorMessage] = useState(""); //FÖR FELMEDDELANDE
const [members, setMembers] = useState<{ id: string; name: string; role: string; profilePic: string }[]>([]);
const [selectedIds, setSelectedIds] = useState<string[]>([]);





// MIN BACKENDTEAMS > MEMBERSCONTROLLER > [GROUPS]
  useEffect(() => {
    if (!groupId) return;

    fetch(`https://webapp-backend-teams.azurewebsites.net/api/members/groups/${groupId}`, { 
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string 
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Unable to fetch members. Database might be down or the group doesn't exist.");
      }
      return res.json();
    })
    .then(data => setMembers(data))
    .catch(err => console.error("Error when trying to fetch members. Network error or server unreachable:", err));
  }, [groupId]);








// MIN EGEN BACKEND - BACKENDEMAILREQUEST 
const sendInvite = (email: string) => {
  // FIXAD URL:
  fetch("https://webapp-backend-emailrequest-hcdcgva6baawcheb.polandcentral-01.azurewebsites.net/api/emailrequest/emailinvite", { 
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string //NYCKEL
    }, 
    body: JSON.stringify({ 
  recipientEmail: email 
    })
  })
  .then(async (res) => {
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Something went wrong.");
    }
    setRecipientEmail(""); 
    setErrorMessage(""); 
  })
  .catch((err) => {
    setErrorMessage(err.message); 
  });
};





//MOCK FÖR ATT RADERA GROUP - HÅRDKODAT
/*const [members, setMembers] = useState([
    { id: '1', name: 'Johan Nilsson', role: 'Student' },
    { id: '2', name: 'Kalle Karlsson', role: 'Student' },
    { id: '3', name: 'Anna Andersson', role: 'Student' },
    { id: '4', name: 'Erik Eriksson', role: 'Teacher' },
]);*/






// Statet som håller koll på vilka ID:n som är ikryssade
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


  // ANROP TILL MIN EGEN BACKEND FÖR ATT RADERA MEDLEM (MembersController -> DeleteMember)
  fetch(`https://webapp-backend-teams.azurewebsites.net/api/members/${id}`, { 
    method: "DELETE",
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string 
    }
  })
  .then(res => {
    if (res.ok) {
      // Ta bort användaren från skärmen om det lyckades i databasen
      setMembers(prev => prev.filter(m => m.id !== id));
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  })
  .catch(err => console.error("Error when trying to delete member:", err));
};
// AVSLUTAR ANROP FÖR DELETE MEMBER









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
        onClick={() => sendInvite(recipientEmail)} 
        className="bg-[#ED5735] hover:bg-[#d44828] text-white font-medium py-2 px-6 pl-2 rounded-[11px] whitespace-nowrap cursor-pointer flex items-center gap-2">
         <Image src="/envelopewhite.svg" alt="" width={15} height={15} className="cursor-pointer" />
            Send Invite
        </button>
    </div>
{errorMessage && <p className="text-red-500 font-semibold text-sm mt-1">{errorMessage}</p>}       
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
{members.map(member => {
  return (
    <Members 
      key={member.id}
      name={member.name}
      role={member.role}
      profilePic={member.profilePic || "/defaultprofile.svg"} // LAGT TILL ATT OM NY PROFILBILD INTE FINNS (ProfilePic), SÅ HAR MAN DEN HÅRDKODADE ATT FALLA TILLBAKA PÅ (/defaultprofile.svg). SAMMA SAK I BACKEND
      isChecked={selectedIds.includes(member.id)}
      onCheckChange={() => handleSelectMember(member.id)}
      onDelete={() => handleDeleteMember(member.id)}
    />
  );
})}
{/* END */}

      </div>
    </div>
  </>
)
}