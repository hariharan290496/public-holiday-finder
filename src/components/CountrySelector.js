import React, { useEffect, useState } from "react";

function CountrySelector({ countryCode, setCountryCode }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://date.nager.at/api/v3/AvailableCountries"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Select Country</label>
      <select
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">-- Select Country --</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelector;
