import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { renderWithClient } from "./mock/utils";

test("render app with title", async () => {
  const result = renderWithClient(<App />);

  expect(await result.findByText(/WHATS'ON/i)).toBeInTheDocument();
});
