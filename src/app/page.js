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
        <div className="flex flex-col justify-center min-h-[40vh] lg:min-h-[60vh] border-b-2 border-b-[#bfb9b0]">
          {/* This div will now grow to fill available space */}
          <div className="flex flex-col items-center md:items-start justify-center gap-6">
            <h1 className="text-[clamp(1.875rem,4.2vw,3.75rem)] w-full md:w-3/4 lg:w-1/2 font-bold px-8 transition-all duration-300">
              <span className="text-[#b61c1c] hidden md:inline-block overflow-hidden md:whitespace-nowrap border-r-2 md:border-r-4 border-r-black animate-[typing_3.5s_steps(40,end),blink-caret_.75s_step-end_infinite]">
                Welcome to <br className="md:hidden"/>BME Learning <br className='md:hidden' />Platform!
              </span>
            </h1>
            <h1 className="md:hidden text-[1.5rem] text-[#b61c1c] w-full text-center font-bold px-8 transition-all duration-300">
              Welcome to BME Learning Platform!
            </h1>
            <h2 className="text-[#292625] text-xl text-center md:text-left md:text-[1.65rem] lg:text-4xl font-bold px-8 transition-all duration-300">
              Your journey to becoming a better Biomedical Engineer starts here!
            </h2>
          </div>

          <div className='px-8 hidden lg:flex flex-row gap-6 mt-25 text-center items-center justify-center'>
            <Link className=' bg-white rounded-3xl shadow-lg lg:text-xl xl:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/learning">Learning</Link>
            <Link className=' bg-white rounded-3xl shadow-lg lg:text-xl xl:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/map">Map</Link>
            <Link className=' bg-white rounded-3xl shadow-lg lg:text-xl xl:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/lab">Lab</Link>
            <Link className=' bg-white rounded-3xl shadow-lg lg:text-xl xl:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/more">More</Link>
            <Link className=' bg-white rounded-3xl shadow-lg lg:text-xl xl:text-3xl w-[20%] h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/about-us">About Us</Link>
          </div>

          <div className='px-8 grid grid-cols-2 grid-rows-3 lg:hidden gap-6 mt-15 mb-10 text-center items-center justify-center'>
            <Link className='text-base md:text-xl bg-white rounded-3xl shadow-lg h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/learning">Learning</Link>
            <Link className='text-base md:text-xl bg-white rounded-3xl shadow-lg h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/map">Map</Link>
            <Link className='text-base md:text-xl bg-white rounded-3xl shadow-lg h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/lab">Lab</Link>
            <Link className='text-base md:text-xl bg-white rounded-3xl shadow-lg h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/more">More</Link>
            <Link className='text-base md:text-xl bg-white rounded-3xl shadow-lg h-auto p-4 hover:shadow-[0_6px_20px_rgba(56,125,255,0.17)] hover:scale-110 transition-all duration-300' href="/about-us">About Us</Link>
          </div>
        </div>

        {/*roadmap journey*/}
        <div className="p-8">
          <div className="flex flex-col justify-center items-center p-10">
            <p className="text-5xl md:text-6xl xl:text-[80px]">Roadmap</p>
            <p className="text-4xl md:text-5xl xl:text-[56px] lg:-mt-2">Journey</p>
          </div>
          <div className="-mt-20 md:mt-0 xl:p-20">
            <div className="flex flex-col scale-85 md:scale-90 lg:scale-80 xl:scale-100 lg:flex-row lg:justify-center lg:gap-6 xl:gap-0">
              <div className="flex flex-col items-center scale-75 md:scale-100 hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" fill="#4D639B" viewBox="0 0 120 100" stroke="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M100 30A45 45 0 1 0 100 70 1 1 0 1 1 100 30z"/>
                  <g transform="translate(44.64 30) scale(0.07)">
                    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" fill="white"/>
                  </g>
                  <circle r={17} cx={100} cy={50} fill="#000000d1"/>
                  <text x={90.5} y={55} fontSize={18} fill="#ffffff">01</text>
                </svg>
                <p className="text-2xl text-center w-auto">Submit English Test</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55 rotate-90 scale-80 lg:hidden" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                  <line x1={20} y1={50} x2={80} y2={50} />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55 hidden lg:flex" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                <line x1={20} y1={50} x2={80} y2={50} />
              </svg>
              <div className="flex flex-col items-center scale-75 -mt-30 md:mt-0 md:scale-100 hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" fill="#4D639B" viewBox="0 0 120 100" stroke="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M100 30A45 45 0 1 0 100 70 1 1 0 1 1 100 30z"/>
                  <g transform="translate(44.64 30) scale(0.07)">
                    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" fill="white"/>
                  </g>
                  <circle r={17} cx={100} cy={50} fill="#000000d1"/>
                  <text x={90.5} y={55} fontSize={18} fill="#ffffff">02</text>
                </svg>
                <p className="text-2xl text-center w-auto">Submit English Test</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55 rotate-90 scale-80 lg:hidden" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                  <line x1={20} y1={50} x2={80} y2={50} />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55 hidden lg:flex" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                <line x1={20} y1={50} x2={80} y2={50} />
              </svg>
              <div className="flex flex-col items-center scale-75 -mt-30 md:mt-0 md:scale-100 hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55" fill="#4D639B" viewBox="0 0 120 100" stroke="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M100 30A45 45 0 1 0 100 70 1 1 0 1 1 100 30z"/>
                  <g transform="translate(44.64 30) scale(0.07)">
                    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" fill="white"/>
                  </g>
                  <circle r={17} cx={100} cy={50} fill="#000000d1"/>
                  <text x={90.5} y={55} fontSize={18} fill="#ffffff">03</text>
                </svg>
                <p className="text-2xl text-center w-auto">Submit English Test</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55 rotate-90 scale-80 lg:hidden" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                  <line x1={20} y1={50} x2={80} y2={50} />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-55 w-55 hidden lg:flex" viewBox="0 0 100 100" stroke="#B6AFA6" strokeWidth={9}>
                <line x1={20} y1={50} x2={80} y2={50} />
              </svg>
              <div className="flex flex-col items-center scale-75 -mt-15 md:mt-0 md:scale-100 hover:scale-110 transition-all duration-300">
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
        <div className="flex flex-col lg:flex-row justify-between ">
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
        <div className = "flex flex-col lg:flex-row gap-6 w-full h-auto p-2 md:p-6 mt-15">
          <div className="flex flex-col gap-8 w-full bg-white p-8 rounded-3xl shadow-2xl justify-center items-center">
            <h2 className="text-center md:text-left lg:text-center text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Mahidol Website, contact list</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start ">
              <div className="flex flex-col gap-6 items-start">
                <a href="https://mahidol.ac.th/th/" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Website</span>
                </a>
                <a href="https://smartedu.mahidol.ac.th/Authen/login.aspx" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Smart EDU</span>
                </a>
                <a href="https://mustudent.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">MU life pass</span>
                </a>
              </div>
              <div className="flex flex-col gap-6 items-start">
                <a href="https://student.mahidol.ac.th/portal/" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Student Portal</span>
                </a>
                <a href="https://mustudent.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">MU life pass</span>
                </a>
                <a href="https://mustudent.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">MU life pass</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full rounded-3xl bg-white shadow-2xl p-4 md:p-6 lg:p-4 xl:p-0 justify-center items-center">
            <h2 className="text-center md:text-left lg:text-center text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 p-2 md:p-0 md:mb-4 lg:mb-8">Engineering Website, contact list</h2>
            <div className="flex flex-col gap-6 items-start">
              <a href="https://www.eg.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Website</span>
              </a>

              <a href="https://www.eg.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Facebook</span>
              </a>

              <a href="https://www.eg.mahidol.ac.th" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full px-4 py-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="p-2 rounded-full">
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