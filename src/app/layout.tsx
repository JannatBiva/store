import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import SidebarRail from "@/components/layout/Sidebar/SidebarRail"; 

export const metadata: Metadata = {
  title: "Marketplace",
  description: "The best place to shop online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarRail />

        {/* Shift everything right by the sidebar width */}
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] 
                        md:pl-[var(--sidebar-w)] pl-14 transition-[padding] duration-200">
          <Navbar />
          <main className="row-start-2">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
