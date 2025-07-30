"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { buildings } from "../../data/building";
import Link from "next/link";
import Image from "next/image";

export default function BuildingPage() {
  const params = useParams();
  const building = buildings.find((b) => b.id === params.id);

  const destination = `${building.latitude},${building.longitude}`;

  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

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
        <div className="mb-12 lg:mb-8">
          <Link
            href="/map"
            className="text-blue-500 hover:underline text-lg lg:text-base"
          >
            ← Back to Map
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center mb-10 lg:block">
          <h1 className="text-4xl font-bold mb-4">{building.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{building.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="w-full h-1/2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Image
              src={building.images[0]}
              alt={building.name}
              width={1000}
              height={1000}
              className="object-cover"
            />
          </div>
          <div className="mt-6 w-full bg-white rounded-lg shadow-lg p-6">
            {building.examples && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Example Rooms</h3>
                <ul className="list-disc list-inside">
                  {building.examples.map((room) => (
                    <li key={room} className="text-gray-600">
                      {room}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-10 justify-end">
              <a
                href={url}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Get destination
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
