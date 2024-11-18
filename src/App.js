import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import YearSelector from "./components/YearSelector";
import HolidayList from "./components/HolidayList";
import Footer from "./components/Footer";

function App() {
  const [countryCode, setCountryCode] = useState("");
  const [year, setYear] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
