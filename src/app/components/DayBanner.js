import { useMemo } from 'react';
import moment from 'moment';

export default function DayBanner({ events, maxEvents = 4 }) {
  const getFilteredEvents = useMemo(() => {
    if (!events || events.length === 0) {
      return [];
    }

    const now = moment();

    // Filter events that haven't ended yet
    let upcomingEvents = events.filter(event => {
      const eventEnd = event.end ? moment(event.end) : moment(event.start);
      return eventEnd.isAfter(now) || eventEnd.isSame(now, 'day');
    });

    // Sort by start date (earliest first)
    const sortedEvents = upcomingEvents.sort((a, b) => {
      return moment(a.start).diff(moment(b.start));
    });

    // Return only the specified number of events
    return sortedEvents.slice(0, maxEvents);
  }, [events, maxEvents]);

  if (getFilteredEvents.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">No upcoming events</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8"> {/* Added horizontal padding */}
      {/*
        Using a responsive grid:
        - grid-cols-1 on small screens
        - sm:grid-cols-2 on medium screens
        - lg:grid-cols-4 on large screens
        - gap-4 for spacing between grid items
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {getFilteredEvents.map((event, index) => {
          const startDate = moment(event.start);
          const endDate = event.end ? moment(event.end) : null;
          const isAllDay = !event.specificTime;
          const isToday = startDate.isSame(moment(), 'day');
          const isTomorrow = startDate.isSame(moment().add(1, 'day'), 'day');
          const isMultiDay = endDate && !startDate.isSame(endDate, 'day');

          // Calculate span duration
          const getSpanText = () => {
            if (isAllDay && !isMultiDay) return 'All Day';
            if (isMultiDay) {
              const daysDiff = endDate.diff(startDate, 'days') + 1;
              if (daysDiff === 7) return 'Week';
              if (daysDiff > 7) return `${Math.ceil(daysDiff / 7)} Weeks`;
              return `${daysDiff} Days`;
            }
            return startDate.format('h:mm A');
          };

          return (
            <div
              key={event.id || index}
              className="flex items-center py-4 px-5 border-l-4 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ borderLeftColor: event.color }}
            >
              {/* Date Section */}
              <div className="w-20 text-center flex-shrink-0"> {/* Added flex-shrink-0 */}
                <div className="text-2xl font-bold text-gray-800">
                  {startDate.format('DD')}
                </div>
                <div className="text-xs font-medium text-gray-600 uppercase">
                  {startDate.format('MMM')}
                </div>
              </div>

              {/* Event Details */}
              <div className="flex-grow min-w-0 ml-4"> {/* Added ml-4 for spacing */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-1"> {/* Changed gap to gap-2, added flex-wrap */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isToday
                      ? 'bg-green-100 text-green-700'
                      : isTomorrow
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : startDate.format('dddd')}
                  </span>

                  <span className="font-medium">
                    {getSpanText()}
                  </span>

                  {isMultiDay && (
                    <span className="text-gray-500">
                      → {endDate.format('MMM DD')}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {event.title}
                  </h3>
                  {index === 0 && (
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium flex-shrink-0">
                      Next
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}