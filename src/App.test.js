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

const mockCountries = [
  { countryCode: "US", name: "United States" },
  { countryCode: "GB", name: "United Kingdom" },
];

describe("App Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders header and footer components", async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText("Public Holiday Finder")).toBeInTheDocument();
    expect(
      screen.getByText(/© 2024 Public Holiday Finder/i)
    ).toBeInTheDocument();
  });

  test("renders country and year selectors", async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText("Select Country")).toBeInTheDocument();
    expect(screen.getByText("Select Year")).toBeInTheDocument();
  });

  test("shows loading state and populates selectors with options", async () => {
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

    await act(async () => {
      render(<App />);
    });

    await waitFor(() =>
      expect(screen.getByText("Select Country")).toBeInTheDocument()
    );

    const countrySelect = screen.getByLabelText(/select country/i);
    await act(async () => {
      await userEvent.click(countrySelect);
    });

    await waitFor(() =>
      expect(screen.getByText("United States")).toBeInTheDocument()
    );

    await act(async () => {
      const option = screen.getByText("United States");
      await userEvent.click(option);

      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  test("displays error message when API call fails", async () => {
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

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("Select Country")).toBeInTheDocument()
    );

    const countrySelect = screen.getByLabelText(/select country/i);
    userEvent.click(countrySelect);

    await waitFor(() =>
      expect(screen.getByText("United States")).toBeInTheDocument()
    );
    userEvent.click(screen.getByText("United States"));

    await waitFor(() => {
      expect(
        screen.getByText("No holidays found for the selected country and year.")
      ).toBeInTheDocument();
    });
  });
});
