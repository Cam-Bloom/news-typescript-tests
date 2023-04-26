import {
  render,
  screen,
  fireEvent,
  act,
  prettyDOM,
  queryByTestId,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ArticleContainer from "./ArticleContainer";
import { UserContext } from "../../context/UserContext";

const userDetails = {
  loggedInUser: "John",
  setLoggedInUser: jest.fn(),
  userDetails: { username: "John" },
};

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => {
    return { article_id: "11" };
  },
  useNavigate: () => mockedUsedNavigate,
}));

describe("Article", () => {
  test("Should render the component correctly", async () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <ArticleContainer />
      </UserContext.Provider>
    );

    const title = await screen.findByText("Designing Better JavaScript APIs");

    expect(title).toBeInTheDocument();
  });

  test("When topic button is clicked should call navigate fucntion", async () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <ArticleContainer />
      </UserContext.Provider>
    );

    await screen.findByText("Designing Better JavaScript APIs");

    const topicButton = screen.getByRole("heading", { name: /coding/i });

    fireEvent.click(topicButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/topics/coding");
  });
});
