import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesScreen from "../app/(tabs)/favorites"; // Adjust path if necessary

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("FavoritesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with no favorite quotes", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { getByText } = render(<FavoritesScreen />);

    await waitFor(() => {
      expect(getByText("No favorite quotes yet.")).toBeTruthy();
    });
  });

  it("loads favorite quotes from AsyncStorage", async () => {
    const mockFavorites = JSON.stringify(["Favorite 1 - Author", "Favorite 2 - Author"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockFavorites);

    const { getByText } = render(<FavoritesScreen />);

    await waitFor(() => {
      expect(getByText("Favorite 1 - Author")).toBeTruthy();
      expect(getByText("Favorite 2 - Author")).toBeTruthy();
    });
  });

  it("clears the favorites list when restart button is pressed", async () => {
    const mockFavorites = JSON.stringify(["Old Favorite - Author"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockFavorites);

    const { getByText, getByRole } = render(<FavoritesScreen />);
    const button = getByRole("button", { name: /restart favorites/i });

    fireEvent.press(button);

    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("favorites");
      expect(getByText("No favorite quotes yet.")).toBeTruthy();
    });
  });
});
