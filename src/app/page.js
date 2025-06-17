// pages/index.js (Pages Router)
'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HomeCalendar from "./components/Calendar";
import { schedule } from "./data/schedule";




export default function Home() { // Receive events as a prop
  const [expandedStep, setExpandedStep] = useState(null);

  const events = schedule.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));

  return (
    <div className="font-pixelify min-h-screen  pb-20 sm:p-20">
      <main className="w-full">
        {/* Hero Section */}
        <div className="flex flex-col items-start justify-center w-full h-[55vh] gap-6 ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold px-8 transition-all duration-300">
            <span className="text-red-600 inline-block overflow-hidden whitespace-nowrap border-r-4 border-r-black animate-[typing_3.5s_steps(40,end),blink-caret_.75s_step-end_infinite]">
              Welcome to BME Learning Platform!
            </span>
          </h1>
          <h2 className="text-2xl md:text-3x    l lg:text-4xl font-bold px-8 transition-all duration-300">
            Your journey to becoming a better Biomedical Engineer starts here!
          </h2>
        </div>


        <div className='flex flex-col gap-8 w-full p-6 mb-20'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>Discover more on these topics</h2>
          <div className='flex flex-row gap-6 items-start justify-around'>
            <Link className='text-md bg-white rounded-3xl shadow-lg text-lg w-auto h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/learning">Learning</Link>
            <Link className='text-md bg-white rounded-3xl shadow-lg text-lg w-auto h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/map">Map</Link>
            <Link className='text-md bg-white rounded-3xl shadow-lg text-lg w-auto h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/lab">Lab</Link>
            <Link className='text-md bg-white rounded-3xl shadow-lg text-lg w-auto h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/more">More</Link>
            <Link className='text-md bg-white rounded-3xl shadow-lg text-lg w-auto h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/about-us">About Us</Link>
          </div>
        </div>


        {/*learning journey section*/}
        <div className="flex flex-col gap-8 w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Roadmap Journey</h2>
          <div className="space-y-4">
            {[
              {
                title: "Complete Application Form",
                description: "Fill out the online application form with your personal and academic information.",
                requirements: [
                  "Valid email address",
                  "Academic transcripts",
                  "Personal statement"
                ]
              },
              {
                title: "Submit Required Documents",
                description: "Upload all necessary documentation to support your application.",
                requirements: [
                  "Resume/CV",
                  "Letters of recommendation",
                  "Portfolio (if applicable)"
                ]
              },
              {
                title: "Interview Process",
                description: "Participate in an interview with our admissions committee.",
                requirements: [
                  "Schedule interview",
                  "Prepare for technical questions",
                  "Showcase your motivation"
                ]
              }
            ].map((step, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-blue-200">
                <div
                  className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all duration-300"
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                </div>
                {expandedStep === index && (
                  <div className="mt-2 ml-12 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <ul className="space-y-2">
                      {step.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- Calendar Section --- */}
        <div className="ml-[60%] justify-end items-end mt-16 w-[40%]">
          <HomeCalendar events={events} />
        </div>
        {/* --- End Calendar Section --- */}


        {/*Mahidol Website, contact list*/}
        <div className = "flex flex-row gap-6 w-full h-auto p-6 mt-15">
          <div className="flex flex-col gap-8 w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Mahidol Website, contact list</h2>
            <div className="flex flex-row gap-6 items-start">
              <div className="flex flex-col gap-6 items-start">
                <a href="https://mahidol.ac.th/th/" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Website</span>
                </a>
                <a href="https://smartedu.mahidol.ac.th/Authen/login.aspx" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Smart EDU</span>
                </a>
                <a href="https://mustudent.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">MU life pass</span>
                </a>
              </div>
              <div className="flex flex-col gap-6 items-start">
                <a href="https://mustudent.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">MU life pass</span>
                </a>
                <a href="https://mustudent.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">MU life pass</span>
                </a>
                <a href="https://mustudent.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">MU life pass</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Engineering Website, contact list</h2>
            <div className="flex flex-col gap-6 items-start">
              <a href="https://www.eg.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Website</span>
              </a>

              <a href="https://www.eg.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Facebook</span>
              </a>

              <a href="https://www.eg.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Line</span>
              </a>

            </div>
          </div>


        </div>

      </main>


      <footer className="mt-16 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
