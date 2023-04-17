import { screen } from "@testing-library/react";
import { renderWithClient } from "../../mock/utils";
import Events from "./Events";

describe("Events Component", () => {
  it("should render event with add new button", async () => {
    renderWithClient(<Events />);

    expect(await screen.findByText(/Add Event/i)).toBeInTheDocument();

    // expect(tr.length).toBeEqual(data.length)
  });

  it("should render table with initial data", async () => {
    renderWithClient(<Events />);

    const columns = await screen.findAllByRole("columnheader");
    const records = await screen.findAllByTestId("event-record");
    const lastRecord = records[records.length - 1];
    expect(columns[0]).toHaveTextContent("Title");
    expect(columns[1]).toHaveTextContent("Type");
    expect(columns[2]).toHaveTextContent("Start Date");
    expect(columns[3]).toHaveTextContent("End Date");
    expect(columns[4]).toHaveTextContent("Description");
    expect(columns[5]).toHaveTextContent("Action");
    expect(lastRecord).toHaveAttribute("id", "2");
    expect(records.length).toBe(2);

    // expect(tr.length).toBeEqual(data.length)
  });
  //   it("Should load message after add new event", async () => {
  //     renderWithClient(<Events />);
  //     const schema = useGetSchema();
  //     console.log(schema);
  //     const form = await screen.findAllByTestId("event-record");
  //   });
});
