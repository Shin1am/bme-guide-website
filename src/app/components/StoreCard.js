'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react'; // Import useEmblaCarousel

// Individual Store Card Component (remains the same)
export function StoreCard({ store }) {
  if (!store) {
    return (
      <div className="w-full h-[40vh] border border-gray-200 rounded-2xl p-5 bg-[#F1EFEA] flex-shrink-0 flex justify-center items-center">
        <p className="text-gray-500">No store data</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[40vh] border border-gray-200 rounded-2xl p-5 bg-[#F1EFEA] flex-shrink-0 flex flex-col justify-between items-center m-2 shadow-lg transition-transform duration-300 transform hover:scale-105">
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-gray-800/70 text-2xl font-semibold text-center">{store.name}</h2>
        </div>
        {store.image && (
          <div className="flex justify-center mb-4">
            {/* <img
              src={store.image}
              alt={store.name}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/150x150/E0E0E0/A0A0A0?text=Image+Error';
              }}
            /> */}
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between items-center text-center">
          <p className="text-gray-600 text-sm mb-2 line-clamp-3">{store.description}</p>
          <div className="mt-auto">
            {store.rating && (
              <p className="text-yellow-500 text-sm mt-1">★ {store.rating}/5</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Carousel Component using Embla Carousel
export default function StoreCarousel({ data = [] }) {
  // Embla Carousel options:
  // loop: true enables infinite looping
  // align: 'start' aligns slides to the start of the viewport
  // slidesToScroll: 1 scrolls one slide at a time
  // breakpoints: responsive settings for different screen sizes
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 2,
    dragFree: true,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 2, align: 'start' }, // Large screens: 4 cards visible, scroll 4
      '(min-width: 768px) and (max-width: 1023px)': { slidesToScroll: 2, align: 'start' }, // Medium screens: 2 cards visible, scroll 2
      '(max-width: 767px)': { slidesToScroll: 1, align: 'center' }, // Small screens: 1 card visible, scroll 1
    }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Callback to update selected index and scroll snaps
  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    emblaApi && emblaApi.scrollTo(index);
  }, [emblaApi]);


  // Effect to add listeners for Embla API changes
  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi); // Initialize scroll snaps on mount
    onSelect(emblaApi); // Set initial selected index

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onInit); // Re-initialize on window resize/re-render
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect, onInit]);


  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg font-medium">No stores available to display.</p>
      </div>
    );
  }

  // Navigation functions using Embla API

  return (
    <div className="relative w-full max-w-[85rem] mx-auto px-4 py-4 overflow-hidden">
      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/60 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75 transition duration-300"
        aria-label="Previous Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/60 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75 transition duration-300"
        aria-label="Next Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      {/* Embla Carousel Container */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex"> {/* Use flex to arrange slides */}
          {data.map((store, index) => (
            <div
              className="embla__slide flex-shrink-0 flex items-center justify-center"
              key={store.id || index} // Use store.id if available, otherwise index
              style={{ minWidth: `calc(100% / var(--slides-per-view, 4))`, paddingLeft: '1rem' , paddingRight: '1rem'}} // Apply minWidth and padding for consistent sizing and gap
            >
              <StoreCard store={store} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {data.length > 0 && ( // Only show dots if there's data
        <div className="flex justify-center mt-6 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === selectedIndex
                  ? 'bg-gray-700 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {data.length > 0 && (
        <div className="text-center mt-4 text-sm text-gray-500">
          {selectedIndex + 1} of {scrollSnaps.length}
        </div>
      )}
    </div>
  );
}