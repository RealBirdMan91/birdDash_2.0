import { auth } from "@/auth";
import React from "react";

async function DashBoardPage() {
  const session = await auth();
  return (
    <div>
      <h3 className="text-3xl">Dashboard</h3>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}

export default DashBoardPage;
