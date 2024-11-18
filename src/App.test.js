// src/__tests__/App.test.js
import { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

// Mock the fetch API
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve([]),
//   })
// );

global.fetch = jest.fn();

// Mock sample holiday data
const mockHolidays = [
  {
    date: "2024-01-01",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "US",
    fixed: true,
    global: true,
    types: ["Public"],
  },
];

// Mock countries data
const mockCountries = [
  { countryCode: "US", name: "United States" },
  { countryCode: "GB", name: "United Kingdom" },
];

describe("App Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders header and footer components", () => {
    render(<App />);
    expect(screen.getByText("Public Holiday Finder")).toBeInTheDocument();
    expect(
      screen.getByText(/© 2024 Public Holiday Finder/i)
    ).toBeInTheDocument();
  });

  test("renders country and year selectors", () => {
    render(<App />);
    expect(screen.getByText("Select Country")).toBeInTheDocument();
    expect(screen.getByText("Select Year")).toBeInTheDocument();
  });

  test("shows loading state and populates selectors with options", async () => {
    // Mock the API response for fetching countries
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { countryCode: "US", name: "United States" },
            { countryCode: "CA", name: "Canada" },
          ]),
      })
    );

    // Render the App component
    render(<App />);

    // Wait for the country options to be loaded
    await waitFor(() =>
      expect(screen.getByText("Select Country")).toBeInTheDocument()
    );

    // Use userEvent to simulate opening the dropdown and selecting "United States"
    const countrySelect = screen.getByLabelText(/select country/i);
    userEvent.click(countrySelect); // Open the dropdown

    // Wait for the dropdown options to be visible
    await waitFor(() =>
      expect(screen.getByText("United States")).toBeInTheDocument()
    );

    // Click the "United States" option
    userEvent.click(screen.getByText("United States"));

    // Now, the "United States" option should be selected, and you can proceed with further tests
  });
});
