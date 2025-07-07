'use client';
import { useState } from 'react';
import { courses } from '../data/courses';
import Image from 'next/image';
import Link from 'next/link';

export default function Learning() {
    const [selectedYear, setSelectedYear] = useState('1');
    const [selectedTerm, setSelectedTerm] = useState('1');
    const [selectedGrade, setSelectedGrade] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showSyllabus, setShowSyllabus] = useState(false);
    const [showGradeDropdown, setShowGradeDropdown] = useState(false);
    const [selectedGradeType, setSelectedGradeType] = useState(null);

   
    const filteredCourses = courses.filter(course => {
        // Search filter
        const searchMatch = searchQuery === '' || 
            course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Year, Term, and Grade filters
        const yearMatch = selectedYear === 'all' || course.year === parseInt(selectedYear);
        const termMatch = selectedTerm === 'all' || course.term === parseInt(selectedTerm);
        const gradeMatch = selectedGrade === 'all' || course.grade === selectedGrade;

        return searchMatch && yearMatch && termMatch && gradeMatch;
    });

    const handleCourseClick = (course) => {
        if (selectedCourse && selectedCourse.code === course.code) {
            // If clicking the same course, close it
            setSelectedCourse(null);
            setShowSyllabus(false);
        } else {
            // Open new course details
            setSelectedCourse(course);
            setShowSyllabus(false);
        }
    };

    return (
    <div className="flex flex-col min-h-screen py-6 md:p-8">
        <div className="relative flex flex-col justify-center items-center w-full mb-10">
        {/* Centered "Learning Center" text */}
            <div className="flex flex-col items-center justify-center w-full font-medodica">
                <h1 className="text-[60px] font-bold mt-3 -mb-8">Learning</h1>
                <h2 className="text-[40px]">Center</h2>
            </div>

        {/* Top-right current filter + Grading */}
        <div className="flex flex-col items-center space-y-6 md:space-y-3 mt-10 md:mt-4 md:absolute md:right-0 md:top-0 md:mr-8 md:z-10 md:items-end">
            {/* Year & Term Display */}
            {(selectedYear !== 'all' && selectedTerm !== 'all') && (
                <div className="text-left text-gray-600 text-md bg-white border rounded-xl px-5 py-2 shadow-md text-lg md:text-xl">
                    {selectedYear !== 'all' && `Year ${selectedYear}`}
                    {selectedYear !== 'all' && selectedTerm !== 'all' && ' • '}
                    {selectedTerm !== 'all' && `Semester ${selectedTerm}`}
                </div>
            )}

            {/* Grading System Dropdown */}
            <div className="relative">
                {/* Main Button */}
                <button
                    onClick={() => {
                        if (selectedGradeType !== null) {
                            setSelectedGradeType(null);
                            setShowGradeDropdown(!showGradeDropdown);
                        } else {
                            setShowGradeDropdown(!showGradeDropdown);
                        }
                    }}
                    className="bg-white text-gray-600 px-6 py-2 rounded-xl border shadow-xl hover:scale-105 transition-all duration-300 text-base md:text-lg"
                >
                    Grading System
                </button>

                {/* Dropdown: Normal / OSU */}
                {showGradeDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-20 p-2">
                        <button
                            onClick={() =>
                                setSelectedGradeType(selectedGradeType === 'Normal' ? null : 'Normal')
                            }
                            onMouseEnter={() => setSelectedGradeType(selectedGradeType === 'Normal' ? null : 'Normal')}
                            onMouseLeave={() => setSelectedGradeType(selectedGradeType === 'Normal' ? null : 'Normal')}
                            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Normal
                        </button>
                        <button
                            onClick={() =>
                                setSelectedGradeType(selectedGradeType === 'OSU' ? null : 'OSU')
                            }
                            onMouseEnter={() => setSelectedGradeType(selectedGradeType === 'OSU' ? null : 'OSU')}
                            onMouseLeave={() => setSelectedGradeType(selectedGradeType === 'OSU' ? null : 'OSU')}
                            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            OSU
                        </button>
                    </div>
                )}

                {/* Sliding Box: Grade Info */}
                {(selectedGradeType === 'Normal' || selectedGradeType === 'OSU') && (
                    <div className="absolute md:right-full top-14 mr-4 bg-white rounded-xl shadow-lg border p-4 w-60 z-40">
                        {selectedGradeType === 'Normal' && (
                            <>
                                <h4 className="mb-2 text-blue-500">Normal Grading</h4>
                                <ul className="space-y-1 text-sm text-gray-700">
                                    <li>A: 4.00</li>
                                    <li>B+: 3.50</li>
                                    <li>B: 3.00</li>
                                    <li>C+: 2.50</li>
                                    <li>C: 2.00</li>
                                    <li>D+: 1.50</li>
                                    <li>D: 1.00</li>
                                    <li>F: 0.00</li>
                                </ul>
                            </>
                        )}
                        {selectedGradeType === 'OSU' && (
                            <>
                                <h4 className="mb-2 text-green-600">OSU Grading</h4>
                                <ul className="space-y-1 text-sm">
                                    <li className="text-green-600">O: Outstanding</li>
                                    <li className="text-green-600">S: Satisfactory</li>
                                    <li className="text-red-500">U: Unsatisfactory</li>
                                </ul>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>

        <div className="flex flex-col gap-4 ">
            <div className="flex flex-row gap-4 justify-center items-center md:justify-between md:items-start">
                <h1 className="text-3xl md:text-4xl mb-4 flex justify-center items-center md:justify-start md:items-start md:mt-10 md:ml-20 ">Course Syllabus</h1>
            </div>
            
            {/* Filter Controls */}
            <div className="mb-8 md:ml-20 flex flex-col gap-4">
                {/* Search Input */}

                <div className="flex flex-row gap-4 ml-20 md:ml-0">
                <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none w-[33%] md:w-[9vw] text-xs md:text-base bg-white px-4 py-2.5 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:8px_10px] bg-[right_12px_center] bg-no-repeat"
                >
                    <option value="all">Select Year</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                </select>
                
                <select 
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="appearance-none w-[40%] md:w-[9vw] text-xs md:text-base bg-white px-4 py-2.5 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:8px_10px] bg-[right_12px_center] bg-no-repeat"
                >
                    <option value="all">Select Semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                </select>
                </div>
                
                <div className='flex flex-col md:flex-row md:gap-10 justify-start items-center'>
                    <div className='mt-10'>
                        <h1 className='text-3xl md:text-4xl'>Course Subject</h1>
                    </div>
                    <div className="relative mt-10"> {/* Removed mr-20 as it might conflict with cat positioning later */}
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
                                placeholder="Search courses by code, title, or description..."
                                className="px-4 py-2.5 pl-10 md:w-[30vw] rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 placeholder:text-[10px] md:placeholder:text-base"
                            />
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 scale-80 md:scale-100" // Centered vertically
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2} // Changed to 2 for better icon appearance
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                </div>

            </div>

            {/* Course Grid - Updated with dropdown details */}
            <div className="flex flex-col px-10 md:px-0 md:gap-8 md:ml-20 md:mr-20">
                {(() => {
                    // Group courses by year and term
                    const groupedCourses = filteredCourses.reduce((acc, course) => {
                        const key = `${course.year}-${course.term}`;
                        if (!acc[key]) {
                            acc[key] = [];
                        }
                        acc[key].push(course);
                        return acc;
                    }, {});

                    // Sort the groups by year and term
                    const sortedGroups = Object.entries(groupedCourses).sort(([keyA], [keyB]) => {
                        const [yearA, termA] = keyA.split('-').map(Number);
                        const [yearB, termB] = keyB.split('-').map(Number);
                        return yearA === yearB ? termA - termB : yearA - yearB;
                    });

                    return sortedGroups.map(([key, courses]) => {
                        const [year, term] = key.split('-').map(Number);
                        const showHeader = true;

                        const sortedCourses = courses.sort((a, b) => {
                            return a.code.localeCompare(b.code);
                        });
                        
                        return (
                            <div key={key} className="flex flex-col gap-4">
                                {showHeader && (
                                    <h2 className="flex flex-col justify-center items-center md:block text-xl md:text-2xl text-gray-800">
                                        Year {year} • Term {term} <br className='md:hidden' />
                                        <span className="text-xs md:text-sm text-gray-500/80 md:ml-4">(Total {courses.length} courses, Normal: {courses.filter(course => course.grade === 'Normal').length}, OSU: {courses.filter(course => course.grade === 'OSU').length})</span>
                                    </h2>
                                )}
                                <div className="flex flex-col justify-center p-2 md:p-4 text-base md:text-2xl bg-white border rounded-xl h-auto">
                                    {sortedCourses.map((course, index) => (
                                        <div key={index}>
                                            {/* Course Item */}
                                            <p 
                                                className={`group p-3 cursor-pointer ${course.grade === "OSU" ? 'text-[#21B512]' : 'text-[#1869C5]'} hover:underline hover:bg-gray-100/50 ${selectedCourse && selectedCourse.code === course.code ? 'bg-gray-100' : ''}`}
                                                onClick={() => handleCourseClick(course)}
                                            >
                                                {course.code} {course.title}
                                                <span className={`${selectedCourse && selectedCourse.code === course.code ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} px-4`}>
                                                    <i className={`fa-solid fa-caret-left transition-all duration-300 ${selectedCourse && selectedCourse.code === course.code ? '-rotate-90' : ''}`}></i>
                                                </span>
                    
                                            </p>

                                            {/* Course Details Dropdown */}
                                            {selectedCourse && selectedCourse.code === course.code && (
                                                <div className={`mx-3 mb-4 p-6 bg-gray-50 border-l-4 ${course.grade === 'OSU' ? 'border-green-500' : 'border-blue-400'} rounded-r-lg shadow-sm`}>
                                                    <div className='flex flex-col md:flex-row gap-[10%]'>
                                                        <div className="space-y-4 md:w-1/2">
                                                                <h3 className="text-lg md:text-2xl font-semibold text-gray-800">{course.fullTitle ? course.fullTitle : course.title}</h3>
                                                           
                                                        
                                                            <div>
                                                                <h4 className="text-sm md:text-lg font-medium text-gray-500 mb-2">Description</h4>
                                                                <p className="text-gray-700 text-base md:text-xl">{course.description}</p>
                                                            </div>
                                                        
                                                            <div>
                                                                <h4 className="text-sm md:text-lg font-medium text-gray-500 mb-2">Details</h4>
                                                                <div className="space-y-1.5 text-xl">
                                                                    <p className="text-gray-700 text-base md:text-xl">Year: {course.year} <span className='px-2'> Semester: {course.term}</span></p>
                                                                    <Link href={`/map/${course.building}`} className='text-blue-600/70 md:text-gray-700 text-base md:text-xl hover:underline'>Room: {course.room}</Link>
                                                                    {/* <p className="text-gray-700 text-base md:text-xl">Grading System: {course.grade}</p> */}
                                                                </div>
                                                            </div>

                                                            <div className='flex flex-row justify-between items-center gap-4 pt-4'>
                                                            

                                                                <button 
                                                                    onClick={() => setShowSyllabus(!showSyllabus)} 
                                                                    className='py-2 text-gray-500/80 rounded-lg hover:text-gray-600 transition-all duration-300 text-base md:text-lg'
                                                                >
                                                                    {showSyllabus ? 'Hide Tips & Tricks' : 'Show Tips & Tricks'}
                                                                </button>
                                                            </div>

                                                            {/* Tips & Tricks Section */}
                                                            {showSyllabus && (
                                                                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                                                                    <h4 className='text-base md:text-lg font-semibold mb-3 text-gray-800'>Tips & Tricks</h4>
                                                                    <p className='text-gray-700 text-base'>{course.tips}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex flex-col mt-5 md:mt-0'>
                                                            <p className='text-gray-800 text-xl md:text-2xl mt-1 underline md:no-underline'>Course Meterials</p>
                                                            {course.links?.syllabus && (
                                                                <a className='px-10 pt-5 pb-3 hover:underline' href={course.links.syllabus} target='_blank' rel='noopener noreferrer'>
                                                                    <i className="fa-solid fa-folder-open text-amber-800/50"></i>
                                                                    <span className='px-5 text-base md:text-xl'>Syllabus</span>
                                                                </a>
                                                            )}
                                                            {course.links?.material && (
                                                                <a className='px-10 pt-5 pb-3 hover:underline' href={course.links.material} target='_blank' rel='noopener noreferrer'>
                                                                    <i className="fa-solid fa-folder-open text-amber-800/50"></i>
                                                                    <span className='px-5 text-base md:text-xl'>Material</span>
                                                                </a>
                                                            )}
                                                            {course.links?.work && (
                                                                <a className='px-10 pt-5 pb-3 hover:underline' href={course.links.work} target='_blank' rel='noopener noreferrer'>
                                                                    <i className="fa-solid fa-folder-open text-amber-800/50"></i>
                                                                    <span className='px-5 text-base md:text-xl'>Work</span>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    });
                })()}
            </div>
        </div>
    </div>
    );
}