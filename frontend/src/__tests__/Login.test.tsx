import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../views/Login";

describe("login tests", () => {
  render(<Login />);

  test("verify login initial state", () => {
    const logoText = screen.getByText("SoftDrive");

    expect(logoText).toBeInTheDocument();
  });
});
