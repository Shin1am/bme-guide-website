'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { lab } from "../data/lab";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener();
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}


export default function Lab() {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState(['All']); // Initialize with 'All' selected
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

    const isMobile = useMediaQuery('(max-width: 768px)');

    
    const AllAvailableType = [
        'All', // Add 'All' as the first option
        ...new Set(lab.flatMap(l => l.type))
    ].sort((a,b) => {
        if (a === 'All') return -1; // Keep 'All' at the beginning
        if (b === 'All') return 1;
        return a.localeCompare(b)
    })

    const toggleType = (type) => {
        if (type === 'All') {
            setSelectedType(['All']); // If 'All' is clicked, only 'All' should be selected
        } else {
            setSelectedType(prev => {
                if (prev.includes(type)) {
                    const newSelection = prev.filter(t => t !== type);
                    return newSelection.length === 0 ? ['All'] : newSelection; // If no types are selected, default to 'All'
                } else {
                    return prev.includes('All') ? [type] : [...prev, type]; // If 'All' was selected, unselect it and select the new type
                }
            });
        }
        // It's generally good UX to keep the menu open if filters are displayed on-screen,
        // so we won't auto-close it here.
    }


    const filteredLab = (() => { // This is an Immediately Invoked Function Expression (IIFE)
        const getSearchMatch = (l) => // Helper function for search query
            searchQuery === '' ||
            l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.description.toLowerCase().includes(searchQuery.toLowerCase());

        // --- Logic for 'All' or empty selection ---
        if (selectedType.includes('All') || selectedType.length === 0) {
            return lab.filter(l => getSearchMatch(l));
        }

        // --- Logic for Perfect Matches (AND condition for types) ---
        const perfectMatches = lab.filter(l => {
            const searchMatch = getSearchMatch(l);
            const allTypesMatch = selectedType.every(type => l.type.includes(type)); // Checks if ALL selected types are present
            return searchMatch && allTypesMatch;
        });

        if (perfectMatches.length > 0) {
            return perfectMatches; // Return perfect matches if found
        }

        // --- Logic for Partial Matches (OR condition for types, as fallback) ---
        const partialMatches = lab.filter(l => {
            const searchMatch = getSearchMatch(l);
            const anyTypeMatch = selectedType.some(type => l.type.includes(type)); // Checks if ANY selected type is present
            return searchMatch && anyTypeMatch;
        });

        return partialMatches; // Fallback to partial matches
    })(); // The IIFE is immediately executed

    // Define the threshold for when to collapse filters into a menu
    const FILTER_THRESHOLD = 7; // If there are 7 or more filters, collapse them all.

    const shouldCollapseIntoMenu = isMobile || AllAvailableType.length >= FILTER_THRESHOLD;


    return (
        <div className="p-4 min-h-screen">
            <div className="flex justify-center items-center mt-10">
                <h1 className="text-5xl md:text-6xl">Our LAB!</h1>
            </div>
            <div className="flex flex-col md:pl-25 py-15"> {/* Changed to flex-col for vertical stacking */}
                <div className="flex flex-col md:flex-row items-center gap-4"> {/* Container for search and menu/filters */}
                    <div className="relative">
                         {/* Cat Image - Positioned absolutely relative to this parent div */}
                            <div className="absolute z-10" style={{ top: '-130px', left: '350px' }}> {/* Adjust top/left for precise placement */}
                                <Image
                                    src={'/cat.png'}
                                    alt='cat-on-searchbar'
                                    width={150} // Adjust size for optimal look
                                    height={150} // Adjust size for optimal look
                                />
                            </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search building by room"
                            className="px-4 py-2.5 pl-10 md:w-[30vw] rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
                        />
                        <svg
                                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={4}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                    </div>

                    {!shouldCollapseIntoMenu ? (
                        // Display all filters directly if not collapsing
                        <div className="flex flex-row gap-4 mt-10 md:mt-0"> {/* Ensure these still have horizontal layout */}
                            {AllAvailableType.map((type, index) => (
                                <div key={index} className="flex justify-center items-center">
                                    <div
                                        className={`flex px-4 py-1 text-xl border-2 rounded-4xl shadow-2xl transition-all duration-300 ease-in-out
                                            ${selectedType.includes(type) ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-300 bg-white text-gray-800'}
                                            cursor-pointer hover:scale-105 hover:shadow-lg active:scale-98 active:shadow-md
                                        `}
                                        onClick={() => toggleType(type)}
                                    >
                                        {type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Display only the menu icon with conditional chevron if collapsing
                        <div className="flex justify-center items-center gap-2"> {/* Added gap for chevron */}
                            <div
                                className="flex px-4 py-1 text-xl rounded-4xl shadow-2xl transition-all duration-300 ease-in-out
                                    border-gray-300  text-gray-800 cursor-pointer hover:scale-105 active:scale-98 active:shadow-md"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                                        d="M4 6h16M6 12h12M8 18h8"
                                    />
                                </svg>
                            </div>
                            {isMenuOpen && ( // Render chevron only when menu is open
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-600 transition-all duration-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            )}
                        </div>
                    )}
                </div>

                {/* This is the container for ALL filters, displayed only when in "collapsed" mode and menu is open */}
                {shouldCollapseIntoMenu && isMenuOpen && (
                    <div className="mt-4 p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 ">
                        {AllAvailableType.map((type, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <div
                                    className={`flex px-4 py-1 text-xl border-2 rounded-4xl shadow-2xl transition-all duration-300 ease-in-out
                                        ${selectedType.includes(type) ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-300 bg-white text-gray-800'}
                                        cursor-pointer hover:scale-105 hover:shadow-lg active:scale-98 active:shadow-md
                                    `}
                                    onClick={() => toggleType(type)}
                                >
                                    {type}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-25">
                {filteredLab.map((lab,index) => (
                    <div
                        key={index}
                        className="block p-6  rounded-3xl"
                    >
                        <div className="flex justify-between items-end">
                            <h3 className="border-2 rounded-4xl px-4 text-3xl">{lab.title}</h3>
                            <span className="text-blue-500/70 hover:underline hover:text-blue-500">
                                <a href={lab.url} target='_blank' rel="noopener noreferrer" className="text-xl">visit website</a>
                            </span>
                        </div>
                        <div className="mt-6 flex w-full h-[25vh] relative">
                            <Image src={lab.picture} alt={`${lab.title} picture`} fill className="object-cover rounded-xl border-2 shadow-lg hover:scale-103"/>
                        </div>

                        <div className="mt-6 w-full">
                            <p className="text-l text-justify">{lab.description}</p>
                            <p className="text-sm text-gray-700/70 mt-5">Tag: {lab.type.join(', ')}</p>
                        </div>

                    </div>

                ))}
            </div>

        </div>
    );
}