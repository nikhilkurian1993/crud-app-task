import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  UseQueryResult,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import { createWrapper, renderWithClient } from "../../mock/utils";
import Events from "./Events";
import StrategicPlanning from "./StrategicPlanning";
import * as eventHooks from "../../hooks/events";

describe("Events Component", () => {
  it("should render event with add new button", async () => {
    const result = renderWithClient(<Events />);

    expect(await result.findByText(/Add Event/i)).toBeInTheDocument();

    // expect(tr.length).toBeEqual(data.length)
  });
});
