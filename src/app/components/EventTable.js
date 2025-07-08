// components/EventTable.js
import React, { useState, useMemo } from 'react';
import moment from 'moment';

// Define event types based on colors or add a type field to your events
const EVENT_TYPES = {
  university: { colors: ['#3357FF'], label: 'University', icon: '🎓' },
  exam: { colors: ['#33FF57'], label: 'Exams', icon: '📝' },
  holiday: { colors: ['#800080', '#FFD700', '#4682B4'], label: 'Holidays', icon: '🏖️' },
  meeting: { colors: ['#FFC300'], label: 'Meetings', icon: '👥' }
};

export default function EventTable({ events, allFutureEvents, maxEvents, currentDate }) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [allEventsView, setAllEventsView] = useState(false);

  // Get event type based on color
  const getEventType = (event) => {
    for (const [type, config] of Object.entries(EVENT_TYPES)) {
      if (config.colors.includes(event.color)) {
        return type;
      }
    }
    return 'other';
  };

  // Filter and sort events
  const getFilteredEvents = useMemo(() => {
    if (!events || events.length === 0) {
      return [];
    }
    const now = moment();
    
    // Filter events that haven't ended yet
    let upcomingEvents = (allEventsView ? allFutureEvents : events).filter(event => {
      const eventEnd = event.end ? moment(event.end) : moment(event.start);
      return eventEnd.isAfter(now) || eventEnd.isSame(now, 'day');
    });

    // Filter by month if not in allEventsView mode
    if (!allEventsView && currentDate) {
      const selectedMonth = moment(currentDate).month();
      const selectedYear = moment(currentDate).year();
      
      upcomingEvents = upcomingEvents.filter(event => {
        const eventStart = moment(event.start);
        const eventEnd = event.end ? moment(event.end) : eventStart;
        
        // Include events that start or end in the selected month, or span across it
        return (
          (eventStart.month() === selectedMonth && eventStart.year() === selectedYear) ||
          (eventEnd.month() === selectedMonth && eventEnd.year() === selectedYear) ||
          (eventStart.isBefore(moment(currentDate).startOf('month')) && 
           eventEnd.isAfter(moment(currentDate).endOf('month')))
        );
      });
    }

    // Apply type/color filters
    if (selectedFilters.length > 0) {
      upcomingEvents = upcomingEvents.filter(event => {
        const eventType = getEventType(event);
        return selectedFilters.includes(eventType);
      });
    }

    // Sort by start date (earliest first)
    const sortedEvents = upcomingEvents.sort((a, b) => {
      return moment(a.start).diff(moment(b.start));
    });

    return sortedEvents;
  }, [events, allFutureEvents, selectedFilters, allEventsView, currentDate]);

  // Get displayed events (limited by maxEvents unless showAll is true)
  const displayedEvents = useMemo(() => {

    
    return showAll ? getFilteredEvents : getFilteredEvents.slice(0, maxEvents);
  }, [getFilteredEvents, maxEvents, showAll]);

  // Toggle filter
  const toggleFilter = (filterType) => {
    setSelectedFilters(prev => 
      prev.includes(filterType) 
        ? prev.filter(f => f !== filterType)
        : [...prev, filterType]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters([]);
  };

  // Get available event types from current events
  const availableTypes = useMemo(() => {
    if (!events || events.length === 0) {
      return [];
    }
    const types = new Set();
    (allEventsView ? allFutureEvents : events).forEach(event => {
      const type = getEventType(event);
      types.add(type);
    });
    return Array.from(types);
  }, [events, allEventsView, allFutureEvents]);

  // Calculate remaining events count
  const remainingEventsCount = getFilteredEvents.length - displayedEvents.length;

  // Early return after all hooks
  if (!events || events.length === 0) {
    return <p className="p-4 text-gray-600">No events to display.</p>;
  }

  if (getFilteredEvents.length === 0 && selectedFilters.length === 0) {
    return (
      <div className="flex flex-col lg:block bg-white shadow-lg rounded-lg p-6 w-full">
        <h3 className="text-xl text-center lg:text-left lg:text-2xl font-bold mb-4 text-[#292625]">
           {allEventsView ? 'Upcoming Events' : `Events for ${moment(currentDate).format('MMMM YYYY')}`}
        </h3>
        <button
            onClick={() => setAllEventsView(!allEventsView)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              allEventsView
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {allEventsView ? 'Show Month View' : 'All Events View'}
          </button>
        <div className='flex justify-center items-center mt-5'>
            <p className="text-gray-600">No upcoming events to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-h-[80vh] w-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-[#292625]">
          {allEventsView ? 'All Upcoming Events' : `Events for ${moment(currentDate).format('MMMM YYYY')}`}
        </h3>
        <span className="text-sm text-gray-500">
          Showing {displayedEvents.length} of {getFilteredEvents.length} events
        </span>
      </div>

      {/* Filter Controls */}
      <div className="mb-6">
        {/* All Events View Toggle */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setAllEventsView(!allEventsView)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              allEventsView
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {allEventsView ? 'Show Month View' : 'All Events View'}
          </button>
          {!allEventsView && currentDate && (
            <span className="text-sm text-gray-600">
              Viewing events for {moment(currentDate).format('MMMM YYYY')}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-sm font-medium text-gray-700 self-center mr-2">Filter by type:</span>
          {availableTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedFilters.includes(type)
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              {EVENT_TYPES[type]?.icon} {EVENT_TYPES[type]?.label || type}
            </button>
          ))}
          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
        
        {/* Show All Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showAll"
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="showAll" className="text-sm text-gray-700">
            Show all events
          </label>
        </div>
      </div>

      {/* Results */}
      {getFilteredEvents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No events match the selected filters.</p>
          <button
            onClick={clearFilters}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Clear filters to see all events
          </button>
        </div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedEvents.map((event, index) => {
                const eventType = getEventType(event);
                return (
                  <tr key={event.id} style={{backgroundColor: `${event.color}1A`}}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {EVENT_TYPES[eventType]?.icon} {EVENT_TYPES[eventType]?.label || eventType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800">
                      {event.title}
                      {index === 0 && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Next
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">
                      {event.end && moment(event.start).startOf('day').isBefore(moment(event.end).startOf('day'))
                        ? `${moment(event.start).format('D MMM')} - ${moment(event.end).format('D MMM ')}`
                        : moment(event.start).format('D MMM')
                      }
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 max-w-xs overflow-hidden text-ellipsis">
                      {event.description || 'No description available.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Show remaining events count */}
          {remainingEventsCount > 0 && !showAll && (
            <div className="flex justify-center items-center mt-4">
              <p className="text-base text-gray-700">
                + {remainingEventsCount} more events
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}