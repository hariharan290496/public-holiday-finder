# Public Holiday Finder

A React-based web application that allows users to explore public holidays for different countries. Users can view holidays in both table and calendar formats, with options to filter by month and year.

## Features

- 🌍 Support for multiple countries
- 📅 Calendar and table view options
- 🔍 Filter holidays by month
- 📱 Responsive design
- 🎨 Clean and modern UI with Tailwind CSS
- ⚡ Real-time data from the Nager.Date API

## Technologies Used

- React 18
- Tailwind CSS
- React Calendar
- React Select
- React Icons
- Jest & React Testing Library

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone [url]
cd public-holiday-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## API

This application uses the [Nager.Date API](https://date.nager.at/Api) to fetch public holiday data. The API provides:
- List of available countries
- Public holidays for specific country and year
- No API key required

## Project Structure

```
public-holiday-finder/
├── public/
├── src/
│   ├── components/
│   │   ├── CountrySelector.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── HolidayCalendar.js
│   │   ├── HolidayList.js
│   │   ├── MonthSelector.js
│   │   └── YearSelector.js
│   ├── App.js
│   ├── index.js
│   └── styles/
└── package.json
```

## Features in Detail

### Country Selection
- Dynamic fetching of available countries
- Searchable dropdown with country names

### Holiday Views
1. Table View
   - Date formatting
   - Holiday type information
   - Local and international names

2. Calendar View
   - Visual representation of holidays
   - Holiday highlights
   - Month navigation

### Filtering
- Month-based filtering in table view
- Year selection (±10 years from current)


## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- [Nager.Date API](https://date.nager.at) for providing the holiday data
- [Create React App](https://create-react-app.dev/) for the initial project setup
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
