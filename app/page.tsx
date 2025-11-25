"use client";

import { FetchApi } from "@/custome-hooks/fetchApi";
import StatusBar from "@/custome-hooks/statusBar";
import { User } from "@/interface/user";


export default function UsersClientPage() {
  const {data , loading , error} = FetchApi<User[]>("/api/users");
  

  if (loading) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

   if (!data || data.length === 0)
    return <p className="text-center text-gray-500 mt-10">No users found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <StatusBar />
      <ul className="space-y-2">
       
        {data.map((user) => (
          <li key={user.id} className="p-4 border rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>  
            <p>City: {user.address.city}</p>
            <p>Company: {user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
