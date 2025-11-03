"use client";

import { useEffect } from "react";
import Router from "next/router";
import { motion } from "framer-motion";

export default function DatabaseErrorPage() {
  const isDbConfigured =
    process.env.NEXT_PUBLIC_DATABASE_CHECK === "true";

  useEffect(() => {
    if (isDbConfigured) {
      Router.replace("/");
    }
  }, [isDbConfigured]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-900 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.h1
          className="text-6xl font-bold text-[#ff0099] mb-4 drop-shadow-[0_0_20px_rgba(255,0,153,0.3)]"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          500
        </motion.h1>

        <h2 className="text-3xl font-semibold text-zinc-300 mb-4">
          Service Unavailable
        </h2>

        <p className="text-zinc-400 max-w-md mx-auto">
          Looks like our systems are still waking up. Let's get you back on
          course once everything’s running smoothly.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => Router.replace("/")}
          className="mt-6 px-6 py-3 rounded-xl bg-[#ff0099] text-white font-medium shadow-[0_0_30px_#ff009933] hover:shadow-[0_0_40px_#ff009955] transition-shadow duration-300"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </div>
  );
}