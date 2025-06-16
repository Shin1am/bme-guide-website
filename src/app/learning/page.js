'use client';
import { useState } from 'react';
import { courses } from '../data/courses';
import Link from 'next/link';

export default function Learning() {
    const [selectedYear, setSelectedYear] = useState('1');
    const [selectedTerm, setSelectedTerm] = useState('1');
    const [selectedGrade, setSelectedGrade] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showSyllabus, setShowSyllabus] = useState(false);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    

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

    return (
        <div className="flex flex-col min-h-screen p-8">
            <div className="flex justify-center align-middle">
                <h1 className="text-4xl font-bold mb-8">About Learning</h1>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold mt-10 ml-20">Grading Systems</h1>
                <div className="flex flex-row justify-start items-start mt-10 ml-20 gap-8">
                    <div className="relative group">
                        <button className="w-[200px] bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-left flex justify-between items-center">
                            <span>Normal</span>
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                            <div className="py-2">
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100">A: 4.00</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100">B+: 3.50</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100">B: 3.00</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100">C+: 2.50</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100">C: 2.00</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100">D+: 1.50</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100">D: 1.00</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100">F: 0.00</a>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button className="w-[200px] bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-left flex justify-between items-center">
                            <span>OSU</span>
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                            <div className="py-2">
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100 text-green-600">O: Outstanding</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100 text-green-600">S: Satisfactory</a>
                                <a href="#" className="block px-6 py-2 hover:bg-gray-100 text-red-600">U: Unsatisfactory</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-20">
                <div className="flex flex-row gap-4 justify-between items-start">
                    <h1 className="text-4xl font-bold mb-8 flex justify-start items-start mt-10 ml-20">Course Syllabus</h1>
                    <div className="relative mt-10 mr-20">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search courses by code, title, or description..."
                            className=" px-4 py-2.5 pl-10 w-[30vw] rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
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
            
            {/* Filter Controls */}
            <div className="mb-8 ml-20 flex flex-col gap-4">
                {/* Search Input */}

                <div className="flex gap-4">
                <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none w-[9vw] bg-white px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:8px_10px] bg-[right_12px_center] bg-no-repeat"
                >
                    <option value="all">Select Year</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                </select>
                
                <select 
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="appearance-none w-[9vw] bg-white px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:8px_10px] bg-[right_12px_center] bg-no-repeat"
                >
                    <option value="all">Select Term</option>
                    <option value="1">Term 1</option>
                    <option value="2">Term 2</option>
                </select>

                <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="appearance-none w-[9vw] bg-white px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:8px_10px] bg-[right_12px_center] bg-no-repeat"
                >
                    <option value="all">Select Grade</option>
                    <option value="Normal">Normal</option>
                    <option value="OSU">OSU</option>
                </select>
                </div>
                
            </div>

            {/* Course Grid - Updated with smaller cards */}
            <div className="flex flex-col gap-8 ml-20 mr-20">
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
                            // First sort by grade
                            const gradeCompare = a.grade.localeCompare(b.grade);
                            // If grades are equal, sort by code
                            return gradeCompare !== 0 ? gradeCompare : a.code.localeCompare(b.code);
                        });
                        return (
                            <div key={key} className="flex flex-col gap-4">
                                {showHeader && (
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Year {year} • Term {term}
                                        <span className="text-sm text-gray-500/80 ml-4">(Total {courses.length} courses, Normal: {courses.filter(course => course.grade === 'Normal').length}, OSU: {courses.filter(course => course.grade === 'OSU').length})</span>
                                    </h2>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {sortedCourses.map((course, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => setSelectedCourse(course)}
                                            className={`block p-4 bg-white border ${course.grade === 'OSU' ? 'border-green-500'  : 'border-blue-400'} rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
                                            style={{
                                                boxShadow: course.grade === 'OSU' ? '0px 2px 10px rgba(62,163,64,0.43)' : '0px 2px 10px rgba(59, 130, 246, 0.43)'
                                            }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium text-base">{course.code}</h4>
                                                    <h5 className="text-gray-700 mt-1 text-sm">{course.title}</h5>
                                                </div>
                                                <span className="text-black text-sm">
                                                   {course.grade}
                                                </span>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500">
                                                Year {course.year} • Term {course.term} • {course.room}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    });
                })()}
            </div>

            {/* Course Details Modal */}
            {selectedCourse && (
                <>
                    {/* Overlay */}
                    <div 
                        className="fixed inset-0 bg-black/80 transition-opacity z-40"
                        onClick={() => {
                            setSelectedCourse(null);
                        }}
                    />
                    
                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className={`bg-white border-5 ${selectedCourse.grade === 'OSU' ? 'border-green-500'  : 'border-blue-400'} rounded-lg shadow-xl w-full max-w-lg mx-4 p-8 relative`}>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-2xl font-bold">{selectedCourse.code}</h2>
                                    <button 
                                        onClick={() => setSelectedCourse(null)}
                                        className="text-gray-500 hover:text-gray-700 hover:rotate-180 transition-all duration-300"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className='flex flex-row justify-between items-end gap-4'>
                                    <h3 className="text-xl font-semibold mb-4">{selectedCourse.fullTitle ? selectedCourse.fullTitle : selectedCourse.title}</h3>
                                    <span className='text-xl text-gray-500 mb-4'>
                                        <Link href={`/map/${selectedCourse.building}`} className='hover:text-blue-500 hover:underline'>{selectedCourse.room}</Link>
                                    </span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div >
                                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                        <p className="mt-1 text-gray-700">{selectedCourse.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Details</h4>
                                        <div className="mt-1 space-y-1">
                                            <p className="text-gray-700">Year: {selectedCourse.year}</p>
                                            <p className="text-gray-700">Term: {selectedCourse.term}</p>
                                            <p className="text-gray-700">Grading System: {selectedCourse.grade}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-row justify-between items-end gap-4 mt-7'>
                                        <a 
                                            href={selectedCourse.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            View Course Materials
                                        </a>

                                        <span>
                                            <button onClick={() => setShowSyllabus(!showSyllabus)} className='px-4 py-2 text-gray-500/80 rounded-lg hover:text-gray-500 transition-all duration-300'>
                                                Tips & Tricks
                                            </button>
                                        </span>
                                    </div>


                                    
                                </div>
                            </div>
                        </div>

                        {showSyllabus && (
                            <div className={`bg-white border-5 ${selectedCourse.grade === "OSU" ? 'border-green-400' : 'border-blue-500'} rounded-lg shadow-xl w-full max-w-lg mx-4 p-8 relative`}>
                                <h4 className='text-xl font-semibold mb-4'>Tips & Tricks</h4>
                                <p className='text-gray-700'>{selectedCourse.tips}</p>
                            </div>
                        )}
                    </div>
                </>
            )}
            </div>

        </div>
    );
}