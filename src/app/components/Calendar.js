'use client';

import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../components/calendar.css';

const localizer = momentLocalizer(moment);

export default function HomeCalendar({ events}) {

    const eventPropsGetter = (event, start, end, isSelected) => {
        
        let newStyle = {
            backgroundColor: event.color, // Use the 'color' property from your event data
            color: 'white',               // Set text color to white for better contrast
            borderRadius: '5px',
            border: 'none',
            fontWeight: 'bold',
          };

          return {
            className: "", // You can add custom classes if needed
            style: newStyle
          };
    };

    const dayPropGetter = (date) => {
        // Find if there's any event that overlaps with this 'date'
        const eventOnDay = events.find(event => {
          // Normalize dates to the start of the day for accurate comparison
          const eventStart = moment(event.start).startOf('day');
          const eventEnd = moment(event.end).startOf('day');
          const checkDate = moment(date).startOf('day');
    
          // Check if the current 'date' falls within the event's start and end range
          // This handles multi-day events by coloring all days they span
          return checkDate.isSameOrAfter(eventStart) && checkDate.isSameOrBefore(eventEnd);
        });
    
        if (eventOnDay && eventOnDay.color) {
          // Use the color from the first event found on this day
          // Added '33' to the end of the hex code for ~20% opacity, which is good for backgrounds
          // You can remove '33' if you want a solid background color
          return {
            style: {
              backgroundColor: eventOnDay.color + '33',
            },
          };
        }
        return {}; // Return empty object if no event for this day, or no specific style
      };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div style={{ height: 600 }}> {/* Adjust height as needed */}
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    // --- Crucial for Read-Only ---
                    // defaultDate={new Date('2025-07-01')}
                    selectable={false} // Disable slot selection
                    draggableAccessor={() => false} // Disable event dragging
                    resizableAccessor={() => false} // Disable event resizing
                    onSelectEvent={null} // Explicitly remove selection handler
                    onSelectSlot={null} // Explicitly remove slot selection handler
                    // Optional: Add a general style to prevent pointer interactions on the calendar itself
                    // style={{ pointerEvents: 'none' }}
                    // --- Display settings ---
                    defaultView="month" // Good for an overview
                    views={['month']} // Allow users to switch views
                    toolbar={true} // Keep navigation toolbar for changing months/views
                    eventPropGetter={eventPropsGetter}
                    dayPropGetter={dayPropGetter}
                    
                />
            </div>
        </div>
    );
}