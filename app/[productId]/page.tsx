"use client";

import React from "react";

// ✅ Define a simple TypeScript interface for props
interface UserProps {
  name: string;
  age: number;
  isStudent: boolean;
}

// ✅ Functional Component with props (typed)
const UserCard: React.FC<UserProps> = ({ name, age, isStudent }) => {
  return (
    <div className="p-4 bg-gray-100 border rounded-md shadow-md">
      <h2 className="text-xl font-bold text-blue-700">{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isStudent ? "🎓 Student" : "👔 Working Professional"}</p>
    </div>
  );
};

// ✅ Main Page Component
export default function HomePage() {
  const user = { name: "Bhumil", age: 21, isStudent: true };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">
        Welcome to My Next.js + TypeScript App 🚀
      </h1>
      <UserCard {...user} />
    </main>
  );
}
