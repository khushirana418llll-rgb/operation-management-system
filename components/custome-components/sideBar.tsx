"use client";

import { Sidebar as SidebarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, Settings , LogOut, User } from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label:"Logout",
    href:"/login",
    icon:LogOut
  },
  {
    label:"Register",
    href:"/registration",
    icon:User
  }


];


const SideBar = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const toggleSidebar = () => setShow((prev) => !prev);

  return (
    <>
      {show ? (
        // Expanded Sidebar
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-[15%] bg-gray-900 text-white p-5 space-y-4 h-screen"
        >
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">My App</h2>
            <SidebarIcon size={30} className="cursor-pointer" onClick={toggleSidebar} />
          </div>

          <nav className="flex flex-col space-y-3">
            {menuItems.map(({ label, href, icon: Icon }) => (
              <Link
                onClick={(e) => {
                  e.preventDefault();

                  if (document.startViewTransition) {
                    document.startViewTransition(() => router.push(href));
                  } else {
                    router.push(href);
                  }
                }}

                key={href}
                href={href}
                className="hover:bg-gray-700 p-2 rounded flex items-center gap-2"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </motion.aside>
      ) : (
        //hidden side bar
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="p-4 bg-gray-900"
        >
          <SidebarIcon size={30} className="cursor-pointer stroke-white" onClick={toggleSidebar} />

          <nav className="flex flex-col mt-4 space-y-4 ">
            {menuItems.map(({ href, icon: Icon }) => (
              <Link key={href} href={href} onClick={(e) => {
                e.preventDefault();

                if (document.startViewTransition) {
                  document.startViewTransition(() => router.push(href));
                } else {
                  router.push(href);
                }
              }} className="py-2">
                <Icon size={30} className="stroke-white" />
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
};


export default SideBar;
