"use client";


import { Sidebar, Home, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
const SideBar = () => {
  const [show, setShow] = useState<boolean>(false)




  const handleSidebarClick = () => {

    setShow(!show);
  };

  return (
    <>
      {show ?
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: show ? 0 : -250 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-[15%] bg-gray-900 text-white p-5 space-y-4 h-screen">

          <div className="flex justify-between ">
            <h2 className="text-xl font-bold">My App</h2>
            <Sidebar size={30} className="cursor-pointer"
              onClick={handleSidebarClick} />
          </div>
          <nav className="flex flex-col space-y-3">
            <Link
              href="/dashboard"
              className="hover:bg-gray-700 p-2 rounded flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="hover:bg-gray-700 p-2 rounded flex items-center gap-2"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>

          </nav>
        </motion.aside>
        : (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: show ? -250 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 bg-gray-900">
            <Sidebar

              size={30}
              className="cursor-pointer stroke-white"
              onClick={handleSidebarClick}
            />

            <nav className="flex flex-col mt-4 ">
              <Link
                href="/dashboard"
                className="py-2 "
              >
                <Home size={30} className="stroke-white"
                />

              </Link>
              <Link
                href="/dashboard/settings"
                className="py-2 "
              >
                <Settings size={30} className="stroke-white"
                />

              </Link>

            </nav>
          </motion.div>
        )
      }
    </>

  );

};

export default SideBar;
