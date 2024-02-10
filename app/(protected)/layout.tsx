import { Navigation } from "@/components/dashboard/Navigation";
import Link from "next/link";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex  items-center h-16 px-4 border-b w-full md:px-6">
        <Link className="flex gap-2 items-center f" href="/dashboard">
          <span className="font-semibold text-xl">
            <span className="text-primary">Bird</span> Dash
          </span>
        </Link>
        <Navigation />
      </header>
      <main className="h-full">{children}</main>
    </>
  );
}

export default layout;
