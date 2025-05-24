import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import events from "../data/events.json";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const calendarDays = [];
  let day = startDate;

  while (day.isSameOrBefore(endDate, "day")) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  const renderEvents = (date) => {
    const formatted = date.format("YYYY-MM-DD");
    const dayEvents = events.filter(event => event.date === formatted);

    return dayEvents.map((event, index) => (
      <div key={index} className="bg-blue-200 text-sm p-1 rounded mt-1 overflow-hidden truncate">
        {event.title}
      </div>
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
  <button
    onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
    className="hover:bg-purple-200 px-2 py-1 rounded transition duration-200"
  >
    Prev
  </button>

  <h2 className="text-xl font-semibold">{currentDate.format("MMMM YYYY")}</h2>

  <button
    onClick={() => setCurrentDate(currentDate.add(1, "month"))}
    className="hover:bg-purple-200 px-2 py-1 rounded transition duration-200"
  >
    Next
  </button>
</div>
      <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
        {calendarDays.map((date, index) => {
          const isToday = date.isSame(dayjs(), "day");
          return (
            <div
              key={index}
              className={`h-24 p-1 border rounded-sm transition duration-150 ease-in-out 
                ${isToday ? "bg-red-100 border-yellow-400" : "border-gray-300 hover:bg-blue-50 hover:ring-1 hover:ring-blue-300 bg-white" }`}
            >
              <div className="text-sm font-bold">{date.date()}</div>
              {renderEvents(date)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;