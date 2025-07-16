'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/learning';

    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [stage, setStage] = useState("email"); // "email" or "otp"
    const [message, setMessage] = useState("");

    const sendOtp = async () => {
        setMessage('sending OTP...');
        const res = await fetch('/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.success) {
            setMessage('OTP sent! Please check your email');
            setStage("otp");
        } else {
            setMessage(data.error || 'Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        setMessage('verifying OTP...');
        const res = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp, email }),
        });

        const data = await res.json();

        if (data.success) {
            setMessage('OTP verified! Redirecting...');
            router.push(redirect); // Redirect to home page
        } else {
            setMessage(data.error || 'Failed to verify OTP');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md ">
                <div className="mb-10"> 
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="mb-6"
                    />
                </div>
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold">Hello, BME student!</h1>
                    <p className="text-2xl ">Please log in to continue</p>
                </div>
            {stage === "email" ? (
                <div className="w-full max-w-md">
                    <input
                        type="email"
                        placeholder="name.sur@student.mahidol.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') sendOtp();
                        }}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button
                        onClick={sendOtp}
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Send OTP
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') verifyOtp();
                        }}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button
                        onClick={verifyOtp}
                        className="w-full bg-green-500 text-white p-2 rounded"
                    >
                        Verify OTP
                    </button>
                </div>
            )}
            {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>
            
        </div>
    )
}