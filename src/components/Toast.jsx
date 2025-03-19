import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose(); // Automatically close the toast after 3 seconds
            }, 3000);

            return () => clearTimeout(timer); // Clear the timer if the component unmounts
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }} // Start off-screen
                    animate={{ y: 0, opacity: 1 }} // Slide in
                    exit={{ y: -100, opacity: 0 }} // Slide out
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }} // Smooth animation
                    className="fixed top-4 left-[40%] transform -translate-x-[40%] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;