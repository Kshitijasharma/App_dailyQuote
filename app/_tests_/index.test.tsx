import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../app/(tabs)/index";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock API response
jest.mock("axios");
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)), // Default no favorites
}));

describe("HomeScreen Component", () => {
  const mockQuote = [{ q: "Test Quote", a: "Test Author" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the loading state initially", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  test("fetches and displays a quote", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockQuote });

    const { getByText, queryByTestId } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("Test Quote - Test Author")).toBeTruthy();
      expect(queryByTestId("loading-indicator")).toBeNull();
    });
  });

  test("displays an error when API fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("Failed to fetch a quote.")).toBeTruthy();
    });
  });

  test("toggles favorite status correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockQuote });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => expect(getByText("Test Quote - Test Author")).toBeTruthy());

    const heartButton = getByText("🤍"); // Initially not favorite
    fireEvent.press(heartButton);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("favorites", JSON.stringify(["Test Quote - Test Author"]));
  });

  test("refresh button fetches a new quote", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockQuote });

    const { getByText, getByRole } = render(<HomeScreen />);
    await waitFor(() => expect(getByText("Test Quote - Test Author")).toBeTruthy());

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [{ q: "New Quote", a: "New Author" }],
    });

    const refreshButton = getByRole("button");
    fireEvent.press(refreshButton);

    await waitFor(() => expect(getByText("New Quote - New Author")).toBeTruthy());
  });
});
