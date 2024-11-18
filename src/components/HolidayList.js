import React from "react";

function HolidayList({ holidays, selectedMonth }) {
  if (!holidays.length) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredHolidays = selectedMonth
    ? holidays.filter(
        (holiday) =>
          new Date(holiday.date).getMonth() + 1 === parseInt(selectedMonth)
      )
    : holidays;

  if (!filteredHolidays.length) {
    return (
      <p className="text-center mt-6 text-gray-700">
        No holidays to display for the selected month.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg shadow-lg border border-gray-200">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-4 px-6 text-left font-bold uppercase tracking-wider">
              Date
            </th>
            <th className="py-4 px-6 text-left font-bold uppercase tracking-wider">
              Name
            </th>
            <th className="py-4 px-6 text-left font-bold uppercase tracking-wider">
              Local Name
            </th>
            <th className="py-4 px-6 text-left font-bold uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredHolidays.map((holiday, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-colors duration-200`}
            >
              <td className="py-4 px-6 text-gray-900">
                {formatDate(holiday.date)}
              </td>
              <td className="py-4 px-6 text-gray-900 font-medium">
                {holiday.name}
              </td>
              <td className="py-4 px-6 text-gray-900">{holiday.localName}</td>
              <td className="py-4 px-6 text-gray-900">
                {holiday.types ? holiday.types.join(", ") : "Public"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HolidayList;
