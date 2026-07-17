import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 p-6">
        {children}
      </main>
    </>
  );
}

export default Layout;