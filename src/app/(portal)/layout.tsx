import Sidebar from "@/components/portal/sidebar";
import { SidebarProvider } from "@/components/portal/sidebar-context";
import TopBar from "@/components/portal/top-bat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Comercio 32",
  description: "Portal Academico Comercio 32",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SidebarProvider>
          <div className="flex flex-col h-screen bg-gray-100">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
