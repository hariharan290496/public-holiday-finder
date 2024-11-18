const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || "https://date.nager.at/api/v3",
  endpoints: {
    availableCountries: "/AvailableCountries",
    publicHolidays: (year, countryCode) =>
      `/PublicHolidays/${year}/${countryCode}`,
  },
};

export default API_CONFIG;
