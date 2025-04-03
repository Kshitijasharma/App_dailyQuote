import React from "react";
import { render } from "@testing-library/react-native";
import NotFoundScreen from "../app/+not-found";

describe("NotFoundScreen Component", () => {
  test("renders the 'Page Not Found' message", () => {
    const { getByText } = render(<NotFoundScreen />);
    expect(getByText("Page Not Found")).toBeTruthy();
  });

  test("renders a go-back button", () => {
    const { getByTestId } = render(<NotFoundScreen />);
    expect(getByTestId("go-back-button")).toBeTruthy();
  });
});
