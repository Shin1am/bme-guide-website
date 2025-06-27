'use client'
import Image from "next/image";
import { useState } from "react";
import { club } from "../data/club";
import { MahidolStore } from "../data/store";
import StoreCarousel from "../components/StoreCard";



export default function More() {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState(['All']); // Initialize with 'All' selected
    const [selectedStoreType, setSelectedStoreType] = useState('mahidol');

    const AllStoreType = [
        ...new Set(MahidolStore.flatMap(c => c.category))
    ].sort((a,b) => {
        return a.localeCompare(b)
    })

    const AllAvailableType = [
        'All', // Add 'All' as the first option
        ...new Set(club.flatMap(c => c.type))
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


    const filteredClub = (() => { // This is an Immediately Invoked Function Expression (IIFE)
        const getSearchMatch = (c) => // Helper function for search query
            searchQuery === '' ||
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase());

        // --- Logic for 'All' or empty selection ---
        if (selectedType.includes('All') || selectedType.length === 0) {
            return club.filter(c => getSearchMatch(c));
        }

        // --- Logic for Perfect Matches (AND condition for types) ---
        const perfectMatches = club.filter(c => {
            const searchMatch = getSearchMatch(c);
            const allTypesMatch = selectedType.every(type => c.type.includes(type)); // Checks if ALL selected types are present
            return searchMatch && allTypesMatch;
        });

        if (perfectMatches.length > 0) {
            return perfectMatches; // Return perfect matches if found
        }

        // --- Logic for Partial Matches (OR condition for types, as fallback) ---
        const partialMatches = club.filter(c => {
            const searchMatch = getSearchMatch(c);
            const anyTypeMatch = selectedType.some(type => c.type.includes(type)); // Checks if ANY selected type is present
            return searchMatch && anyTypeMatch;
        });

        return partialMatches; // Fallback to partial matches
    })(); // The IIFE is immediately executed

    const filteredStore = MahidolStore.filter(store => {
        return store.category === selectedStoreType;
    })

    return (
        <div className="p-4 min-h-screen">
            <div className="flex justify-start items-center mt-10 px-25">
                <h1 className="text-6xl">Mahidol Club!</h1>
            </div>
            <div className="flex flex-row pl-25 py-15">
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
                    <h1 className="flex justify-center items-center text-2xl">Type: </h1>
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
            <div className="grid grid-cols-2 gap-8 px-25">
                {filteredClub.map((club,index) => (
                    <div
                        key={index}
                        className="block p-6 rounded-2xl border-2"
                        style={{backgroundColor: club.bgColor}}
                    >
                        <div className="flex flex-row gap-10 justify-start items-center">
                            <div className="flex w-1/2 h-[20vh] relative">
                                <Image src={club.picture} alt={`${club.title} picture`} fill className="object-cover rounded-xl border-2 shadow-lg hover:scale-103"/>
                            </div>
                            <div className="flex flex-col border-2 w-full h-[20vh]">
                                <div className="flex justify-start border-b-2">
                                    <h3 className="text-3xl py-3 px-4">{club.title}</h3>
                                </div>
                                <div className="mt-6 w-full">
                                    <p className="text-base px-4">{club.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            <div className="mt-20 ml-30 flex justify-start items-center">
                <h1 className="text-6xl">STORE</h1>
                <div className="flex flex-row gap-4 ml-10 capitalize">
                    {AllStoreType.map((type, index) => (
                    <div key={index} className="flex justify-center items-center">
                        <div 
                            className={`flex px-4 py-1 text-xl border-2 rounded-4xl transition-all duration-300 ease-in-out
                                ${selectedStoreType.includes(type) ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-300 bg-white text-gray-800'}
                                cursor-pointer hover:scale-105 hover:shadow-lg active:scale-98 active:shadow-md
                            `}
                            onClick={() => setSelectedStoreType(type)}    
                        >
                            {type}
                        </div>
                    </div>
                ))}
                </div>
                
            </div>
            <div className="m-15">
                <StoreCarousel data={filteredStore} />
            </div>

        </div>  
    );
}