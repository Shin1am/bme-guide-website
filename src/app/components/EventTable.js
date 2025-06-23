// components/EventTable.js
import React from 'react';
import moment from 'moment'; // Assuming you're already using moment for dates

export default function EventTable({ events }) {


  if (!events || events.length === 0) {
    return <p className="p-4 text-gray-600">No events to display.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-h-[80vh] w-full overflow-y-auto"> {/* Added max-height and overflow for scrolling */}
      <h3 className="text-2xl font-bold mb-4 text-[#292625]">Upcoming Events</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Description</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th> */}
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Time</th> */}
          </tr>
        </thead>
        <tbody className="bg-divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id} style={{backgroundColor: `${event.color}1A`}}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{event.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {event.end && moment(event.start).startOf('day').isBefore(moment(event.end).startOf('day'))
                 ? `${moment(event.start).format('D/MM/YY')} - ${moment(event.end).format('D/MM/YY')}`
                 : moment(event.start).format('D/MM/YY')
                }
              </td>

              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location || 'N/A'}</td> */}
              <td className="px-6 py-4 text-sm text-gray-800 max-w-xs overflow-hidden text-ellipsis">
                {event.description || 'No description available.'}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {event.specificTime ? `${moment(event.start).format('h:mm A')} - ${moment(event.end).format('h:mm A')}` : 'N/A'}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};