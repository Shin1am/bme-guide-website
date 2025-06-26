// components/Calendar.js (No changes needed from previous response)
'use client';
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../components/calendar.css';
import { useCallback, useMemo } from "react";


const localizer = momentLocalizer(moment);

export default function HomeCalendar({ events, currentDate, onNavigate }) { // Receive props

    const onPrevClick = useCallback(() => {
      onNavigate(moment(currentDate).subtract(1, "M").toDate());
    }, [currentDate, onNavigate]);

    const onNextClick = useCallback(() => {
      onNavigate(moment(currentDate).add(1, "M").toDate());
    }, [currentDate, onNavigate]);

    const eventPropsGetter = (event, start, end, isSelected) => {
        let newStyle = {
            backgroundColor: event.color,
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            fontWeight: 'bold',
          };
          return {
            className: "",
            style: newStyle
          };
    };

    const dayPropGetter = (currentDay) => {
        const eventOnDay = events.find(event => {
          const eventStart = moment(event.start).startOf('day');
          const eventEnd = moment(event.end).startOf('day');
          const checkDate = moment(currentDay).startOf('day');
          return checkDate.isSameOrAfter(eventStart) && checkDate.isSameOrBefore(eventEnd);
        });

        if (eventOnDay && eventOnDay.color) {
          return {
            style: {
              backgroundColor: eventOnDay.color + '33',
            },
          };
        }
        return {};
      };

    const formats = useMemo(
      () => ({
        weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dd', culture),
        dateFormat: (date,culture,localizer) => localizer.format(date, 'D', culture),
      }),
      []
    );

    return (
        <div className="rounded-lg p-6 w-[60%]" > {/* Original width, no changes */}
            <div style={{ height: 450 }}> {/* Original height, no changes */}
              <div className="flex flex-row justify-between mx-6 mt-3 mb-6">
                  <h1 className="text-[27px] text-[#4d639b]">MU Schedule</h1>
                  <div className="flex gap-3 justify-center items-center">
                    <button className="text-[#5b70a5] hover:scale-120 transition-all duration-200" onClick={onPrevClick}>
                      <i className="fa-solid fa-chevron-left fa-lg"></i>
                    </button>
                    <h2 className="text-4xl text-[#5b70a5] font-medodica">{moment(currentDate).format("MMM YYYY")}</h2>
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
                    selectable={false}
                    draggableAccessor={() => false}
                    resizableAccessor={() => false}
                    onSelectEvent={null}
                    onSelectSlot={null}
                    view="month"
                    toolbar={false}
                    eventPropGetter={eventPropsGetter}
                    dayPropGetter={dayPropGetter}
                    formats={formats}
                    date={currentDate} // Use the prop here
                />
            </div>
        </div>
    );
}