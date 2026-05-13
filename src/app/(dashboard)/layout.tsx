import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full">{children}</main>
      </div>
    </div>
  );
}