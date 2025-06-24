// components/EventTable.js
import React from 'react';
import moment from 'moment';

export default function EventTable({ events, maxEvents = 5 }) {
  if (!events || events.length === 0) {
    return <p className="p-4 text-gray-600">No events to display.</p>;
  }

  // Filter and sort events to show only upcoming events
  const getUpcomingEvents = () => {
    const now = moment();
    
    // Filter events that haven't ended yet
    const upcomingEvents = events.filter(event => {
      const eventEnd = event.end ? moment(event.end) : moment(event.start);
      // Consider an event as "upcoming" if it hasn't ended yet
      return eventEnd.isAfter(now) || eventEnd.isSame(now, 'day');
    });

    // Sort by start date (earliest first)
    const sortedEvents = upcomingEvents.sort((a, b) => {
      return moment(a.start).diff(moment(b.start));
    });

    // Return only the specified number of events
    return sortedEvents.slice(0, maxEvents);
  };

  const displayEvents = getUpcomingEvents();

  if (displayEvents.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <h3 className="text-2xl font-bold mb-4 text-[#292625]">Upcoming Events</h3>
        <p className="p-4 text-gray-600">No upcoming events to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-h-[80vh] w-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-[#292625]">Upcoming Events</h3>
        <span className="text-sm text-gray-500">
          Showing {displayEvents.length} of {events.filter(event => {
            const eventEnd = event.end ? moment(event.end) : moment(event.start);
            return eventEnd.isAfter(moment()) || eventEnd.isSame(moment(), 'day');
          }).length} upcoming events
        </span>
      </div>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayEvents.map((event, index) => (
            <tr key={event.id} style={{backgroundColor: `${event.color}1A`}}>
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
                  ? `${moment(event.start).format('D/MM/YY')} - ${moment(event.end).format('D/MM/YY')}`
                  : moment(event.start).format('D/MM/YY')
                }
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 max-w-xs overflow-hidden text-ellipsis">
                {event.description || 'No description available.'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {events.filter(event => {
        const eventEnd = event.end ? moment(event.end) : moment(event.start);
        return eventEnd.isAfter(moment()) || eventEnd.isSame(moment(), 'day');
      }).length > maxEvents && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {events.filter(event => {
              const eventEnd = event.end ? moment(event.end) : moment(event.start);
              return eventEnd.isAfter(moment()) || eventEnd.isSame(moment(), 'day');
            }).length - maxEvents} more upcoming events...
          </p>
        </div>
      )}
    </div>
  );
}