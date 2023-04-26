import {
  render,
  screen,
  fireEvent,
  act,
  prettyDOM,
  queryByTestId,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import AboutUsBody from "./AboutUsBody";

describe("About Us Body", () => {
  test("Should render correctly", () => {
    render(<AboutUsBody />);

    const header = screen.getByRole("heading", { name: /about us/i });

    expect(header).toBeInTheDocument();
  });
});
