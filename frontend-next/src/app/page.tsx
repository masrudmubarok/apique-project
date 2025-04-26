'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from "next/dynamic";

const TaskList = dynamic(() => import("../components/TaskList"), { ssr: false });

const HomePage = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
            <header className="bg-white shadow-lg py-6">
                <div className="container mx-auto text-center px-4">
                    <motion.h1
                        className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        ✨ Task Management App
                    </motion.h1>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                        Plan your day, stay productive!
                    </p>
                </div>
            </header>
            <main className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <TaskList />
              </motion.div>
            </main>
        </div>
    );
};

export default HomePage;