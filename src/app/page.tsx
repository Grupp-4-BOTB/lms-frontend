import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/home");
}

// DENNA SIDAN BARA PRECIS ROUTAR DIREKT TILL HOME, SÅ STARTSIDAN NÄR MAN ÖPPNAR PROJEKTET INTE HAMNAR PÅ 404 SIDAN.