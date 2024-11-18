import React from "react";

function YearSelector({ year, setYear }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Select Year</label>
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">-- Select Year --</option>
        {years.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearSelector;
