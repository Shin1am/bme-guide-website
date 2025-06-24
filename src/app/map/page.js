'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buildings } from "../data/building";

export default function Map() {
    const [hoveredBuilding, setHoveredBuilding] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBuildings = buildings.filter(building => {
        const roomStart = building.roomStart.toLowerCase();

        const MatchedNumber = searchQuery.startsWith(roomStart);

        const MatchPrefix = roomStart.startsWith(searchQuery.toLowerCase());

        return MatchedNumber || MatchPrefix
    });

    return (
        <div className="min-h-screen p-8">
            {/*<div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Campus Map</h1>
                
                {/* Map Container with Hotspots *}
                <div className="relative w-full">
                    {/* Base Map Image *}
                    <div className="relative w-full h-[100vh]">
                        <Image 
                            src="/mapsalaya.jpg" 
                            alt="map-salaya" 
                            fill
                            className="object-cover rounded-lg shadow-lg"
                        />
                        
                        {/* Hotspots *}
                        {buildings.map((building) => (
                            <div
                                key={building.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                                style={{
                                    left: `${building.x}%`,
                                    top: `${building.y}%`
                                }}
                            >
                                {/* Hotspot Marker *}
                                <div 
                                    className="w-6 h-6 rounded-full cursor-pointer transform transition-all duration-300 bg-red-50"
                                    onMouseEnter={() => setHoveredBuilding(building)}
                                    onMouseLeave={() => setHoveredBuilding(null)}
                                >
                                    <Link href={`/map/${building.id}`} className="block w-full h-full" />
                                </div>

                                {/* Tooltip *}
                                {hoveredBuilding?.id === building.id && (
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg p-3 transform transition-all duration-300 z-10">
                                        <h3 className="font-semibold text-gray-900">{building.name}</h3>
                                        <p className="text-sm text-gray-600">{building.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            ex. {building.examples.join(', ')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Building List *}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {buildings.map((building) => (
                        <Link 
                            key={building.id}
                            href={`/map/${building.id}`}
                            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="font-semibold text-lg">{building.name}</h3>
                            <p className="text-gray-600">{building.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                ex. {building.examples.join(', ')}
                            </p>
                        </Link>
                    ))}
                </div>
            </div> */}
            <div className="flex flex-row justify-start">
                <h1 className="text-5xl p-8"> Campus Map</h1>
                <div className="relative mt-8 mr-20 ">
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
        
                
            </div>       
            <div className="flex flex-row w-full h-[80vh] mt-10">
                <div className="relative w-1/2 h-auto justify-center items-center mx-10 my-5">
                    <Image 
                        src="/mapsalaya.jpg" 
                        alt="map-salaya" 
                        width={4596} 
                        height={3355}
                        className="object-contain rounded-xl shadow-xl hover:scale-105 transition-all duration-150 border-2 border-black"
                    />

                    {buildings.map((building) =>
                        <div 
                            key={building.id} 
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                             style={{
                                    left: `${building.x}%`,
                                    top: `${building.y}%`
                                }}
                        >
                            <div 
                                    className={`w-4 h-4 rounded-full cursor-pointer transform transition-all duration-300 bg-red-500 ${hoveredBuilding?.id === building.id ? 'opacity-100' : 'opacity-50'}`}
                                >
                                    <Link href={`/map/${building.id}`} className="block w-full h-full" />
                                </div>

                        </div>
                    )};
                </div>
                <div className="flex flex-col gap-5 mt-5">
                    {filteredBuildings.map((building) => (
                        <Link 
                            key={building.id}
                            href={`/map/${building.id}`}
                            className="py-6 pl-5 pr-8 w-auto bg-white rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            onMouseEnter={() => setHoveredBuilding(building)}
                            onMouseLeave={() => setHoveredBuilding(null)}
                        >
                            <div className="flex flex-col justify-center items-center">
                                <h3 className="font-semibold text-lg">{building.name}</h3>
                                <p className="text-sm text-gray-500">
                                    ex. {building.examples.join(', ')}
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}