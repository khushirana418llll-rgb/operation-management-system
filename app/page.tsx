"use client";

import { redirect } from "next/navigation";

export default function UsersClientPage() {
 
  redirect("/login");
  return null;
}
