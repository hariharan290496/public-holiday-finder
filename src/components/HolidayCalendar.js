import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./HolidayCalendar.css";

function HolidayCalendar({ holidays, year }) {
  const [activeDate, setActiveDate] = useState(new Date(`${year}-01-01`));

  const holidayMap = holidays.reduce((acc, holiday) => {
    const date = new Date(holiday.date).toDateString();
    acc[date] = holiday.name;
    return acc;
  }, {});

  //Holiday name
  const tileContent = ({ date, view }) => {
    if (view === "month" && holidayMap[date.toDateString()]) {
      return (
        <div className="bg-blue-500 text-white rounded p-1 text-xs text-center">
          {holidayMap[date.toDateString()]}
        </div>
      );
    }
    return null;
  };

  //restrict navigating to prev or next year
  const handleActiveDateChange = ({ activeStartDate }) => {
    const newYear = activeStartDate.getFullYear();
    if (newYear === year) {
      setActiveDate(activeStartDate);
    } else {
      setActiveDate(new Date(`${year}-${activeStartDate.getMonth() + 1}-01`));
    }
  };

  return (
    <div className="mt-6" data-testid="holiday-calendar">
      <Calendar
        tileContent={tileContent}
        minDetail="month"
        showNeighboringMonth={false}
        className="holiday-calendar"
        activeStartDate={activeDate}
        onActiveStartDateChange={handleActiveDateChange}
      />
    </div>
  );
}

export default HolidayCalendar;
