import React from "react";
import Select from "react-select";

function MonthSelector({ selectedMonth, setSelectedMonth }) {
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  // Handle selection change
  const handleChange = (selectedOption) => {
    setSelectedMonth(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Month
      </label>
      <Select
        options={[{ value: "", label: "All Months" }, ...monthOptions]}
        onChange={handleChange}
        value={
          monthOptions.find((option) => option.value === selectedMonth) || {
            value: "",
            label: "All Months",
          }
        }
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

export default MonthSelector;
