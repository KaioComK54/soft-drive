import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../views/Dashboard";

test("dashboard tests", () => {
  render(<Dashboard />);
});
