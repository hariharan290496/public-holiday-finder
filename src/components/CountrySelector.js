import React, { useEffect, useState } from "react";
import Select from "react-select";

function CountrySelector({ countryCode, setCountryCode }) {
  const [countries, setCountries] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://date.nager.at/api/v3/AvailableCountries"
        );
        const data = await response.json();
        setCountries(data);

        const formattedOptions = data.map((country) => ({
          value: country.countryCode,
          label: country.name,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (selectedOption) => {
    setCountryCode(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Country
      </label>
      <Select
        options={options}
        onChange={handleChange}
        value={options.find((option) => option.value === countryCode) || null}
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

export default CountrySelector;
