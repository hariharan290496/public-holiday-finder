import React, { useState, useEffect } from "react";
import { FaTable, FaCalendarAlt } from "react-icons/fa";
import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import YearSelector from "./components/YearSelector";
import MonthSelector from "./components/MonthSelector";
import HolidayList from "./components/HolidayList";
import HolidayCalendar from "./components/HolidayCalendar";
import Footer from "./components/Footer";

function App() {
  const currentYear = new Date().getFullYear();
  const [countryCode, setCountryCode] = useState("");
  const [year, setYear] = useState(currentYear);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [view, setView] = useState("table");

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

  useEffect(() => {
    setSelectedMonth("");
  }, [countryCode, year]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <CountrySelector
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
          <YearSelector year={year} setYear={setYear} />
          {holidays.length > 0 && view === "table" && (
            <MonthSelector
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          )}

          {holidays.length > 0 && (
            <div className="flex justify-end mb-4 space-x-2">
              <button
                onClick={() => setView("table")}
                className={`flex items-center px-4 py-2 rounded shadow-md transition duration-150 ${
                  view === "table"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FaTable className="mr-2" /> Table View
              </button>
              <button
                onClick={() => setView("calendar")}
                className={`flex items-center px-4 py-2 rounded shadow-md transition duration-150 ${
                  view === "calendar"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FaCalendarAlt className="mr-2" /> Calendar View
              </button>
            </div>
          )}

          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {loading ? (
            <div className="flex justify-center mt-6">
              <div className="loader"></div>
            </div>
          ) : (
            !error &&
            (view === "table" ? (
              <HolidayList holidays={holidays} selectedMonth={selectedMonth} />
            ) : (
              <HolidayCalendar holidays={holidays} year={year} />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
