import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuoteListScreen from "../app/(tabs)/explore"; // Adjust path if necessary

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("QuoteListScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with no quotes", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { getByText } = render(<QuoteListScreen />);

    await waitFor(() => {
      expect(getByText("No quotes available.")).toBeTruthy();
    });
  });

  it("loads quotes from AsyncStorage", async () => {
    const mockQuotes = JSON.stringify(["Quote 1 - Author", "Quote 2 - Author"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockQuotes);

    const { getByText } = render(<QuoteListScreen />);

    await waitFor(() => {
      expect(getByText("Quote 1 - Author")).toBeTruthy();
      expect(getByText("Quote 2 - Author")).toBeTruthy();
    });
  });

  it("clears the quote list when restart button is pressed", async () => {
    const mockQuotes = JSON.stringify(["Old Quote - Author"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockQuotes);

    const { getByText, getByRole } = render(<QuoteListScreen />);
    const button = getByRole("button", { name: /restart list/i });

    fireEvent.press(button);

    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("exploreQuotes");
      expect(getByText("No quotes available.")).toBeTruthy();
    });
  });
});
