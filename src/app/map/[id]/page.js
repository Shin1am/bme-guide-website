'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { buildings } from '../../data/building';
import Link from 'next/link';
import Image from 'next/image';

export default function BuildingPage() {
    const params = useParams();
    const building = buildings.find(b => b.id === params.id);

    const [zoomed, setZoomed] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setZoomed(true);
        }, 500);
    }, []);

    if (!building) {
        return (
            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Building Not Found</h1>
                    <Link href="/map" className="text-blue-500 hover:underline">
                        Return to Map
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/map" className="text-blue-500 hover:underline">
                        ← Back to Map
                    </Link>
                </div>
                
                <h1 className="text-4xl font-bold mb-4">{building.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{building.description}</p>

                <div className="flex flex-row justify-between items-center gap-10">
                    <div className="relative w-[60%] h-[60vh] mb-4 overflow-hidden rounded-lg shadow-lg">
                        <div 
                            className="absolute w-full h-full transition-transform duration-4000 ease-in-out" 
                            style={{transform: zoomed ? `scale(3.4) translate(${(50-building.x)}%, ${(50 - building.y)}%)` : 'scale(1) translate(0%, 0%)'}}>
                            <Image src={"/mapsalaya.jpg"} alt="map-salaya" fill className="object-cover" />
        
                        </div>
                        
                    </div>
                    <div className="flex flex-col justify-between items-center w-1/2">
                        <div className="w-full h-1/2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <Image src={building.images[0]} alt={building.name} width={1000} height={1000} className="object-cover" />
                        </div>
                        <div className="mt-6 w-full bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold mb-2">Example Rooms</h3>
                            <ul className="list-disc list-inside">
                            {building.examples.map((room) => (
                                <li key={room} className="text-gray-600">{room}</li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
} 