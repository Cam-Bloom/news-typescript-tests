import {
  render,
  screen,
  fireEvent,
  waitFor,
  queryByTestId,
} from "@testing-library/react";
import { UserContext } from "../../context/UserContext";
import CommentsSection from "./CommentsSection";

const userDetails = {
  loggedInUser: "John",
  setLoggedInUser: jest.fn(),
  userDetails: { username: "John" },
};
const noUserDetails = {
  loggedInUser: null,
  setLoggedInUser: jest.fn(),
  userDetails: { username: undefined },
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => {
    return { article_id: "11" };
  },
  useNavigate: () => mockedUsedNavigate,
}));

describe("Comment Section", () => {
  test("Section should render correctly", async () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <CommentsSection error={null} loading={false} />;
      </UserContext.Provider>
    );

    const commentHeader = screen.getByRole("heading", { name: /comments/i });

    await screen.findAllByRole("listitem");

    expect(commentHeader).toBeInTheDocument();
  });

  test("Should map over comments to to fill the section", async () => {
    render(
      <UserContext.Provider value={noUserDetails as any}>
        <CommentsSection error={null} loading={false} />;
      </UserContext.Provider>
    );

    const listItems = await screen.findAllByRole("listitem");
    const commentButton = screen.getByRole("button");

    fireEvent.click(commentButton);
    const noUserError = screen.getByText(/please login to post comments/i);

    expect(noUserError).toBeInTheDocument();
    expect(listItems).toHaveLength(5);
  });

  test("If no user is logged in and tries to post a comment a error message should appear", async () => {
    render(
      <UserContext.Provider value={noUserDetails as any}>
        <CommentsSection error={null} loading={false} />;
      </UserContext.Provider>
    );

    const commentButton = screen.getByRole("button");

    fireEvent.click(commentButton);

    const noUserError = screen.getByText(/please login to post comments/i);

    await screen.findAllByRole("listitem");

    expect(noUserError).toBeInTheDocument();
  });

  test("When log in error appears the login button should direct to login page", async () => {
    render(
      <UserContext.Provider value={noUserDetails as any}>
        <CommentsSection error={null} loading={false} />;
      </UserContext.Provider>
    );

    const commentButton = await screen.findByRole("button");
    fireEvent.click(commentButton);

    const loginButton = await screen.findByRole("heading", { name: /login/i });
    fireEvent.click(loginButton);

    await screen.findAllByRole("listitem");

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
  });

  test("After an input and button pressed a new comment card with that text should appear", async () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <CommentsSection error={null} loading={false} />;
      </UserContext.Provider>
    );

    await screen.findAllByRole("listitem");

    const input = await screen.findByRole("textbox");
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "abc12we4f" } });

    const commentButton = screen.getByRole("button");
    fireEvent.click(commentButton);

    const newComment = await screen.findByText("abc12we4f");

    expect(newComment).toBeInTheDocument();
  });

  test("If the delete button is pressed then the comment should no longer appear", async () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <CommentsSection error={null} loading={false} />;
      </UserContext.Provider>
    );

    const deleteButton = await screen.findByTestId("deleteButton");

    const johnsComment = screen.queryByText("test comment");

    await screen.findAllByRole("listitem");

    expect(johnsComment).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(johnsComment).not.toBeInTheDocument();
  });

  test('On focus or type should have class of "activeInput"', async () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <CommentsSection error={null} loading={false} />;
      </UserContext.Provider>
    );
    const input = await screen.findByRole("textbox");
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "abc12we4f" } });

    const form = await screen.findByTestId("form");

    await screen.findAllByRole("listitem");

    expect(form).toHaveClass("activeInput");
  });

  test('If user is logged in but tries to post empty comment input should have class of "invalid"', async () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <CommentsSection error={null} loading={false} />;
      </UserContext.Provider>
    );

    await screen.findAllByRole("listitem");

    const commentButton = screen.getByRole("button");
    fireEvent.click(commentButton);

    const form = await screen.findByTestId("form");

    expect(form).toHaveClass("invalid");
  });

  //   test("If loading is present the dom should be empty", async () => {
  //     render(
  //       <UserContext.Provider value={userDetails as any}>
  //         <CommentsSection error={null} loading={true} />;
  //       </UserContext.Provider>
  //     );
  //     const form = screen.queryByTestId("form");

  //     expect(form).not.toBeInTheDocument();
  //   });

  //   test.only("If an error is present the dom should be empty", async () => {
  //     render(
  //       <UserContext.Provider value={userDetails as any}>
  //         <CommentsSection error={"this is an error"} loading={false} />;
  //       </UserContext.Provider>
  //     );
  //     await screen.findByTestId("nothing");
  //     await waitFor(() => screen.queryAllByRole("listitem"));

  //     const form = screen.queryByTestId("form");

  //     expect(form).not.toBeInTheDocument();
  //   });
});
