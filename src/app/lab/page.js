'use client'
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Lab() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const images = [
        "/Red_building_1.jpeg",
        "/Red_building_2.jpeg",
        "/Red_building_3.jpeg",
        // Add more images as needed
    ];

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentImageIndex((prevIndex) => 
    //             prevIndex === images.length - 1 ? 0 : prevIndex + 1
    //         );
    //     }, 3000); // Change image every 3 seconds

    //     return () => clearInterval(interval); // Cleanup on component unmount
    // }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-start items-center text-4xl font-bold h-[60vh]">
                <div className="flex flex-col mt-10">
                    <h1>Our Laboratories</h1>
                </div>
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col w-[30vw] justify-center items-start">
                        <h2 className="text-2xl font-semibold mb-10 mt-10">BART LAB (Center for Biomedical and Robotics Technology)</h2>
                        <p className="text-lg text-left">
                            It is a laboratory for biomedical and robotics technology.
                        </p>
                        <a href="https://bartlab.org/newweb/homepage/" target="_blank" rel="noopener noreferrer" className="text-sm text-left text-gray-400 mt-5 hover:text-blue-500">
                            Visit Website
                        </a>
                    </div>
                    <div className="flex flex-col w-[30vw] mt-10 justify-center items-start relative">
                        <div className="relative w-full h-[400px]">
                            {images.map((src, index) => (
                                <div
                                    key={src}
                                    className={`absolute mt-10 w-full h-full transition-opacity duration-500 ${
                                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <Image
                                        src={src}
                                        alt={`Building ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg shadow-lg"
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}