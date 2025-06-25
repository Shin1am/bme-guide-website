'use client'
import Image from "next/image";
import { useState } from "react";
import { lab } from "../data/lab";


export default function Lab() {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState(['All']); // Initialize with 'All' selected

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

    

    return (
        <div className="p-4 min-h-screen">
            <div className="flex justify-center items-center mt-7">
                <h1 className="text-6xl">Our LAB!</h1>
            </div>
            <div className="flex flex-row pl-25 py-15">
                <div className="relative">
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search building by room"
                        className="px-4 py-2.5 pl-10 w-[30vw] rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
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

                <div className="px-4 flex flex-row gap-4">
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
            
                
            </div>
            <div className="grid grid-cols-3 gap-8 px-25">
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
                            <p className="text-lg">{lab.description}</p>
                            <p className="text-sm text-gray-700/70 mt-5">Tag: {lab.type.join(', ')}</p>
                        </div>

                    </div>

                ))}
            </div>

        </div>  
    );
}