import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import YearSelector from "./components/YearSelector";
import HolidayList from "./components/HolidayList";
import Footer from "./components/Footer";

function App() {
  const currentYear = new Date().getFullYear();
  const [countryCode, setCountryCode] = useState("");
  const [year, setYear] = useState(currentYear);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableCountries, setAvailableCountries] = useState([]);

  //Available countries
  useEffect(() => {
    const fetchAvailableCountries = async () => {
      try {
        const response = await fetch(
          "https://date.nager.at/api/v3/AvailableCountries"
        );
        const data = await response.json();
        setAvailableCountries(data.map((country) => country.countryCode));
      } catch (error) {
        console.error("Error fetching available countries:", error);
      }
    };

    fetchAvailableCountries();
  }, []);

  //User's country code
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch(
          "https://ipinfo.io?token=YOUR_IPINFO_API_KEY"
        ); // Replace with your API key
        const data = await response.json();
        if (data && data.country) {
          //country availability check
          if (availableCountries.includes(data.country)) {
            setCountryCode(data.country);
          } else {
            console.warn("User country not available in Nager.Date API");
            setCountryCode(""); // Reset country code if not available
          }
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    if (availableCountries.length > 0) {
      fetchUserLocation();
    }
  }, [availableCountries]);

  useEffect(() => {
    const fetchHolidays = async () => {
      if (countryCode && year) {
        setLoading(true);
        setError("");
        try {
          const response = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
          );
          if (response.ok) {
            const data = await response.json();
            setHolidays(data);
          } else {
            setHolidays([]);
            setError("No holidays found for the selected country and year.");
          }
        } catch (error) {
          console.error("Error fetching holidays:", error);
          setError("Failed to fetch holidays. Please try again.");
          setHolidays([]);
        }
        setLoading(false);
      }
    };
    fetchHolidays();
  }, [countryCode, year]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow max-w-2xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <CountrySelector
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
          <YearSelector year={year} setYear={setYear} />
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {loading ? (
            <div className="flex justify-center mt-6">
              <div className="loader"></div>
            </div>
          ) : (
            !error && <HolidayList holidays={holidays} />
          )}
          {!countryCode && (
            <p className="text-center text-yellow-500 mt-4">
              Your country is not available. Please select a country manually.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
