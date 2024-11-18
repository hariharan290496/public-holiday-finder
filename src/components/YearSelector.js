import React from "react";
import Select from "react-select";

function YearSelector({ year, setYear }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

  const options = years.map((yr) => ({
    value: yr,
    label: yr.toString(),
  }));

  const handleChange = (selectedOption) => {
    setYear(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Year
      </label>
      <Select
        options={options}
        onChange={handleChange}
        value={options.find((option) => option.value === year) || null}
        isClearable
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "rgba(209, 213, 219)", //gray-300
            "&:hover": { borderColor: "rgba(96, 165, 250)" }, //blue-500 on hover
            boxShadow: "none",
          }),
        }}
      />
    </div>
  );
}

export default YearSelector;
