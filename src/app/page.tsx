import { redirect } from "next/navigation";

export default function RootPage() {
  // RADERA INTE. 
  //DENNA SIDAN ROUTAR OSS DIREKT TILL FÖRSTASIDAN NÄR VI FÖRST ÖPPNAR UPP 
  redirect("/home");
}