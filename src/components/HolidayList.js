import React from "react";

function HolidayList({ holidays }) {
  if (!holidays.length) {
    return <p className="text-center mt-6">No holidays to display.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">Date</th>
            <th className="py-2 px-4 bg-gray-200">Name</th>
            <th className="py-2 px-4 bg-gray-200">Local Name</th>
            <th className="py-2 px-4 bg-gray-200">Type</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday, index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2 px-4">{holiday.date}</td>
              <td className="py-2 px-4">{holiday.name}</td>
              <td className="py-2 px-4">{holiday.localName}</td>
              <td className="py-2 px-4">
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
