import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import HomeArticleContainer from "./HomeArticleContainer";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const setSearchQueries = jest.fn();

test("renders container correctly", async () => {
  render(
    <HomeArticleContainer
      searchQueries={{
        limit: 10,
        topic: undefined,
        sort_by: "votes",
        order: "DESC",
      }}
      setSearchQueries={setSearchQueries}
    />
  );

  expect(await screen.findByRole("list")).toBeInTheDocument();
});

test("renders correct number of list items", async () => {
  render(
    <HomeArticleContainer
      searchQueries={{
        limit: 10,
        topic: undefined,
        sort_by: "votes",
        order: "DESC",
      }}
      setSearchQueries={setSearchQueries}
    />
  );

  expect(await screen.findAllByRole("listitem")).toHaveLength(10);
});
