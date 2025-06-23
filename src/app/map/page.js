'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buildings } from "../data/building";

export default function Map() {
    const [hoveredBuilding, setHoveredBuilding] = useState(null);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Campus Map</h1>
                
                {/* Map Container with Hotspots */}
                <div className="relative w-full">
                    {/* Base Map Image */}
                    <div className="relative w-full h-[100vh]">
                        <Image 
                            src="/mapsalaya.jpg" 
                            alt="map-salaya" 
                            fill
                            className="object-cover rounded-lg shadow-lg"
                        />
                        
                        {/* Hotspots */}
                        {buildings.map((building) => (
                            <div
                                key={building.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                                style={{
                                    left: `${building.x}%`,
                                    top: `${building.y}%`
                                }}
                            >
                                {/* Hotspot Marker */}
                                <div 
                                    className="w-6 h-6 rounded-full cursor-pointer transform transition-all duration-300 bg-red-50"
                                    onMouseEnter={() => setHoveredBuilding(building)}
                                    onMouseLeave={() => setHoveredBuilding(null)}
                                >
                                    <Link href={`/map/${building.id}`} className="block w-full h-full" />
                                </div>

                                {/* Tooltip */}
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

                {/* Building List */}
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
            </div>
        </div>
    );
}