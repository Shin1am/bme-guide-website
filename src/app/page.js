'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HomeCalendar from "./components/Calendar";
import EventTable from "./components/EventTable";
import { schedule as initialScheduleData } from "./data/schedule";
import moment from "moment";
import DayBanner from "./components/DayBanner";


export default function Home() {
  const [allEvents, setAllEvents] = useState([]);
  const [allFutureEventsProps, setAllFutureEventsProps] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  useEffect(() => {
    const convertedEvents = initialScheduleData.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
    setAllEvents(convertedEvents);
    filterAndSetEvents(convertedEvents, new Date()); // Initial filter
  }, []);

  const filterAndSetEvents = (eventsToFilter, date) => {
    const startOfMonth = moment(date).startOf('month').toDate();
    const endOfMonth = moment(date).endOf('month').toDate();
    const now = moment().startOf('day').toDate();

    // First, filter for events within the current calendar month AND are future/current
    const monthlyAndFutureEvents = eventsToFilter.filter(event => {
      const eventStart = moment(event.start).toDate();
      const eventEnd = moment(event.end).toDate();

      const isFutureOrCurrent = moment(eventEnd).isSameOrAfter(now, 'day');

      const startsInMonth = moment(eventStart).isBetween(startOfMonth, endOfMonth, null, '[]');
      const endsInMonth = moment(eventEnd).isBetween(startOfMonth, endOfMonth, null, '[]');
      const spansMonth = moment(eventStart).isBefore(startOfMonth, 'day') && moment(eventEnd).isAfter(endOfMonth, 'day');

      const isInCurrentMonthView = startsInMonth || endsInMonth || spansMonth;

      return isFutureOrCurrent && isInCurrentMonthView;
    });

    const allFutureEventsProps = eventsToFilter.filter(event => {
        const eventEnd = moment(event.end).toDate();
        return moment(eventEnd).isSameOrAfter(now, 'day');
      });
      allFutureEventsProps.sort((a, b) => a.start.getTime() - b.start.getTime());
      setAllFutureEventsProps(allFutureEventsProps);

    // If no events are found for the current month view, then show ALL future/current events
    if (monthlyAndFutureEvents.length === 0) {
      const allFutureEvents = eventsToFilter.filter(event => {
        const eventEnd = moment(event.end).toDate();
        return moment(eventEnd).isSameOrAfter(now, 'day');
      });
      allFutureEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
      setFilteredEvents(allFutureEvents);
    } else {
      // Otherwise, show the monthly filtered events
      monthlyAndFutureEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
      setFilteredEvents(monthlyAndFutureEvents);
    }
  };


  const handleCalendarNavigate = (newDate) => {
    setCurrentCalendarDate(newDate);
    filterAndSetEvents(allEvents, newDate);
  };

  return (
    <div className="font-pixelify min-h-screen">
      <main className="w-full p-8 sm:p-20">
        {/* Hero Section*/}
        <div className="flex flex-col justify-center w-[80vw] h-[40vh] md:h-[40vh] lg:w-full lg:h-[60vh] border-b-2 border-b-[#bfb9b0]">
          <div className="flex flex-col items-start justify-center gap-6">
            <h1 className="text-3xl w-1/2 md:text-5xl lg:text-6xl font-bold px-8 transition-all duration-300">
              <span className="text-[#b61c1c] inline-block overflow-hidden whitespace-nowrap border-r-4 border-r-black animate-[typing_3.5s_steps(40,end),blink-caret_.75s_step-end_infinite]">
                Welcome to BME Learning Platform!
              </span>
            </h1>
            <h2 className="text-[#292625] text-xl md:text-3xl lg:text-4xl font-bold px-8 transition-all duration-300">
              Your journey to becoming a better Biomedical Engineer starts here!
            </h2>
          </div>

          <div className='px-8 flex flex-row gap-6 mt-25 text-center items-center justify-center'>
            <Link className='text-base bg-white rounded-3xl shadow-lg md:text-xl lg:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/learning">Learning</Link>
            <Link className='text-base bg-white rounded-3xl shadow-lg md:text-xl lg:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/map">Map</Link>
            <Link className='text-base bg-white rounded-3xl shadow-lg md:text-xl lg:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/lab">Lab</Link>
            <Link className='text-base bg-white rounded-3xl shadow-lg md:text-xl lg:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/more">More</Link>
            <Link className='text-base bg-white rounded-3xl shadow-lg md:text-xl lg:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/about-us">About Us</Link>
          </div>
        </div>

        {/*roadmap journey*/}
        <div className="p-8">
          <div className="flex flex-col justify-center items-center p-10">
            <p className="text-4xl lg:text-[80px]">Roadmap</p>
            <p className="text-3xl lg:text-[56px] lg:-mt-5">Journey</p>
          </div>
          <div className="p-20">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col items-center hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" fill="#4D639B" viewBox="0 0 120 100" stroke="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M100 30A45 45 0 1 0 100 70 1 1 0 1 1 100 30z"/>
                  <g transform="translate(44.64 30) scale(0.07)">
                    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" fill="white"/>
                  </g>
                  <circle r={17} cx={100} cy={50} fill="#000000d1"/>
                  <text x={90.5} y={55} fontSize={18} fill="#ffffff">01</text>
                </svg>
                <p className="text-2xl text-center w-auto">Submit English Test</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                <line x1={20} y1={50} x2={80} y2={50} />
              </svg>
              <div className="flex flex-col items-center hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" fill="#4D639B" viewBox="0 0 120 100" stroke="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M100 30A45 45 0 1 0 100 70 1 1 0 1 1 100 30z"/>
                  <g transform="translate(44.64 30) scale(0.07)">
                    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" fill="white"/>
                  </g>
                  <circle r={17} cx={100} cy={50} fill="#000000d1"/>
                  <text x={90.5} y={55} fontSize={18} fill="#ffffff">02</text>
                </svg>
                <p className="text-2xl text-center w-auto">Submit English Test</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                <line x1={20} y1={50} x2={80} y2={50} />
              </svg>
              <div className="flex flex-col items-center hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" fill="#4D639B" viewBox="0 0 120 100" stroke="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M100 30A45 45 0 1 0 100 70 1 1 0 1 1 100 30z"/>
                  <g transform="translate(44.64 30) scale(0.07)">
                    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" fill="white"/>
                  </g>
                  <circle r={17} cx={100} cy={50} fill="#000000d1"/>
                  <text x={90.5} y={55} fontSize={18} fill="#ffffff">03</text>
                </svg>
                <p className="text-2xl text-center w-auto">Submit English Test</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                <line x1={20} y1={50} x2={80} y2={50} />
              </svg>
              <div className="flex flex-col items-center hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" fill="#4D639B" viewBox="0 0 120 100" stroke="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M100 30A45 45 0 1 0 100 70 1 1 0 1 1 100 30z"/>
                  <g transform="translate(44.64 30) scale(0.07)">
                    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" fill="white"/>
                  </g>
                  <circle r={17} cx={100} cy={50} fill="#000000d1"/>
                  <text x={90.5} y={55} fontSize={18} fill="#ffffff">04</text>
                </svg>
                <p className="text-2xl text-center w-auto">Submit English Test</p>
              </div>
          
            </div>
            
          </div>
        </div>

        {/* --- Calendar Section --- */}
        <div className="flex justify-between mt-15">
          <EventTable 
            events={filteredEvents} 
            allFutureEvents={allFutureEventsProps}
            maxEvents={4}
            currentDate={currentCalendarDate}/>
          <HomeCalendar
            events={allEvents}
            currentDate={currentCalendarDate}
            onNavigate={handleCalendarNavigate}
          />
        </div>
        {/* <DayBanner events={filteredEvents} /> */}
        {/* --- End Calendar Section --- */}


        {/*Mahidol Website, contact list - NO STYLE CHANGES*/}
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
                <a href="https://student.mahidol.ac.th/portal/" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:pr-8">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Student Portal</span>
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
    </div>
  );
}