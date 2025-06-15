'use client';
import Link from "next/link";
import { useState } from "react";


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-green-700 text-white sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <h2 className="text-3xl font-sans">BME</h2>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-6 text-lg">
                <Link href="/" className="hover:text-blue-200 hover:scale-110 transition-all duration-300">Home</Link>
                <Link href="/learning" className="hover:text-blue-200 hover:scale-110 transition-all duration-300">Learning</Link>
                <Link href="/map" className="hover:text-blue-200 hover:scale-110 transition-all duration-300">Map</Link>
                <Link href="/lab" className="hover:text-blue-200 hover:scale-110 transition-all duration-300">Lab</Link>
                <Link href="/more" className="hover:text-blue-200 hover:scale-110 transition-all duration-300">More</Link>
                <Link href="/about-us" className="hover:text-blue-200 hover:scale-110 transition-all duration-300">About Us</Link>
            </div>

            <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    {isMenuOpen ? (
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-blue-500 to-green-700 md:hidden">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link 
                            href="/" 
                            className="hover:text-blue-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                           Home
                        </Link>
                        <Link 
                            href="/learning" 
                            className="hover:text-blue-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Learning
                        </Link>
                        <Link 
                            href="/map" 
                            className="hover:text-blue-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Map
                        </Link>
                        <Link 
                            href="/lab" 
                            className="hover:text-blue-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Lab
                        </Link>
                        <Link 
                            href="/more" 
                            className="hover:text-blue-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            More
                        </Link>
                        <Link 
                            href="/about-us" 
                            className="hover:text-blue-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}