import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import HomeSortSection from "./HomeSortSection";

describe("HomeSortSection", () => {
  const setSearchQueriesMock = jest.fn();

  beforeEach(() => {
    setSearchQueriesMock.mockClear();
  });

  test("renders component with initial state", () => {
    render(<HomeSortSection setSearchQueries={setSearchQueriesMock} />);

    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
  });

  test("expands and collapses the accordion when clicked", () => {
    render(<HomeSortSection setSearchQueries={setSearchQueriesMock} />);

    const accordion = screen.getByTestId("accordian");
    const expandButton = screen.getByTestId("expand-accordian");

    // Assert that the accordion is initially collapsed
    expect(accordion).toHaveStyle({ height: "0px" });

    // Click on the expand button
    fireEvent.click(expandButton);

    // Assert that the accordion is expanded
    expect(accordion).toHaveStyle({ height: "60px" });

    // Click on the expand button again
    fireEvent.click(expandButton);

    // Assert that the accordion is collapsed
    expect(accordion).toHaveStyle({ height: "0px" });
  });

  test("changes sort by value when select option is changed", () => {
    render(<HomeSortSection setSearchQueries={setSearchQueriesMock} />);

    const select = screen.getByRole("combobox");

    // Change the select option to "Comment Count"
    fireEvent.change(select, { target: { value: "comment_count" } });

    // Assert that the select option is changed to "Comment Count"
    expect(screen.getByDisplayValue("Comment Count")).toBeInTheDocument();
  });

  test("changes order value when checkbox is toggled", () => {
    render(<HomeSortSection setSearchQueries={setSearchQueriesMock} />);

    const checkbox = screen.getByRole("checkbox");

    // Toggle the checkbox
    fireEvent.click(checkbox);

    // Assert that the checkbox is checked
    expect(checkbox).toBeChecked();

    // Toggle the checkbox again
    fireEvent.click(checkbox);

    // Assert that the checkbox is unchecked
    expect(checkbox).not.toBeChecked();
  });

  test("calls setSearchQueries with correct values when form is submitted", () => {
    render(<HomeSortSection setSearchQueries={setSearchQueriesMock} />);

    const select = screen.getByRole("combobox");
    const checkbox = screen.getByRole("checkbox");
    const filterButton = screen.getByRole("button", { name: "Filter" });

    // Change the select option to "Votes"
    fireEvent.change(select, { target: { value: "votes" } });
    // Toggle the checkbox
    fireEvent.click(checkbox);
    // Click on the filter button
    fireEvent.click(filterButton);

    // Assert that setSearchQueries is called with the correct values
    expect(setSearchQueriesMock).toHaveBeenCalledWith({
      limit: 10,
      topic: undefined,
      sort_by: "votes",
      order: "ASC",
    });
  });
});

// old tests

// import { render, screen, fireEvent } from "@testing-library/react";
// import HomeSortSection from "./HomeSortSection";

// const setSearchQueries = jest.fn();

// describe("Home Sort Section", () => {
//   test('Should set search queires when  "filter" button is pressed', () => {
//     render(<HomeSortSection setSearchQueries={setSearchQueries} />);

//     const filterButton = screen.getByRole("button", { name: /filter/i });

//     fireEvent.click(filterButton);

//     expect(setSearchQueries).toHaveBeenCalled();
//   });

//   test("Should extend accordian when arrow is pressed", () => {
//     render(<HomeSortSection setSearchQueries={setSearchQueries} />);

//     const expandAccordian = screen.getByTestId("expand-accordian");

//     fireEvent.click(expandAccordian);

//     const accordian = screen.getByTestId("accordian");

//     expect(accordian).not.toHaveStyle({ height: "0px" });
//   });

//   test("Should change search queries to ascending when flip box is pressed", () => {
//     render(<HomeSortSection setSearchQueries={setSearchQueries} />);

//     const orderCheckbox = screen.getByRole("checkbox");

//     fireEvent.click(orderCheckbox);

//     expect(orderCheckbox).toBeChecked();
//   });

//   test("Should change selection from options", () => {
//     render(<HomeSortSection setSearchQueries={setSearchQueries} />);

//     const dropdown = screen.getByRole("combobox");

//     fireEvent.change(dropdown, { target: { value: "comment_count" } });

//     expect(dropdown).toHaveValue("comment_count");
//   });
// });
