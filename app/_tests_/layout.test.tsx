import { render } from "@testing-library/react-native";
import TabLayout from "../app/(tabs)/_layout";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

describe("TabLayout", () => {
  it("renders correctly", () => {
    const { getByText } = render(<TabLayout />);

    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Quotes List")).toBeTruthy();
    expect(getByText("Favorites")).toBeTruthy();
  });

  it("contains correct tab icons", () => {
    const { getByTestId } = render(<TabLayout />);
    
    expect(getByTestId("tab-home-icon")).toBeTruthy();
    expect(getByTestId("tab-list-icon")).toBeTruthy();
    expect(getByTestId("tab-favorites-icon")).toBeTruthy();
  });
});
