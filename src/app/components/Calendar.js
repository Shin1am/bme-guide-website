'use client';
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../components/calendar.css';
import { useCallback, useMemo, useState } from "react";


const localizer = momentLocalizer(moment);

export default function HomeCalendar({ events}) {

    const [date, setDate] = useState(moment().toDate());

    const onPrevClick = useCallback(() => {
      setDate(moment(date).subtract(1, "M").toDate())
    }, [date])

    const onNextClick = useCallback(() => {
      setDate(moment(date).add(1, "M").toDate())
    }, [date])


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

    const dayPropGetter = (currentDay) => {

        // Find if there's any event that overlaps with this 'date'
        const eventOnDay = events.find(event => {
          // Normalize dates to the start of the day for accurate comparison
          const eventStart = moment(event.start).startOf('day');
          const eventEnd = moment(event.end).startOf('day');
          const checkDate = moment(currentDay).startOf('day');
    
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




    const formats = useMemo(
      () => ({
        weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dd', culture),
        dateFormat: (date,culture,localizer) => localizer.format(date, 'D', culture),
      }),
      []
    )

    return (
        <div className="rounded-lg p-6 w-[40%]" >
            <div style={{ height: 450 }}> {/* Adjust height as needed */}
              <div className="flex flex-row justify-between mx-6 mt-3 mb-6">
                  <h1 className="text-[27px] text-[#4d639b]">MU Schedule</h1>
                  <div className="flex gap-3 justify-center items-center">
                    <button className="text-[#5b70a5] hover:scale-120 transition-all duration-200" onClick={onPrevClick}>
                      <i className="fa-solid fa-chevron-left fa-lg"></i>
                    </button>
                    <h2 className="text-2xl text-[#5b70a5]">{moment(date).format("MMM YY")}</h2>
                    <button className="text-[#5b70a5] hover:scale-120 transition-all duration-200" onClick={onNextClick}>
                      <i className="fa-solid fa-chevron-right fa-lg"></i>
                    </button>
                  </div>
              </div>
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
                    view="month"
                    toolbar={false} // Keep navigation toolbar for changing months/views
                    eventPropGetter={eventPropsGetter}
                    dayPropGetter={dayPropGetter}
                    formats={formats}
                    date={date}
                />
            </div>
        </div>
    );
}