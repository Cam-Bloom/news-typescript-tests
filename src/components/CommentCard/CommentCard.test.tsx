import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../../context/UserContext";
import CommentCard from "./CommentCard";

describe("Comment Card", () => {
  const userDetails = {
    loggedInUser: "John", // Mock the value of loggedInUser
    setLoggedInUser: jest.fn(), // Mock the function setLoggedInUser
    userDetails: { username: "John" }, // Mock the value of userDetails
  };
  const userDetailsBob = {
    loggedInUser: "Bob", // Mock the value of loggedInUser
    setLoggedInUser: jest.fn(), // Mock the function setLoggedInUser
    userDetails: { username: "bob" }, // Mock the value of userDetails
  };

  const comment = {
    comment_id: 1,
    author: "John",
    body: "This is a comment",
  };
  const setComments = jest.fn();

  test("Should display a the comment", () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <CommentCard comment={comment} setComments={setComments} />
      </UserContext.Provider>
    );

    const body = screen.getByText("This is a comment");

    expect(body).toBeInTheDocument();
  });

  test("Should render a delete button for logged in user", () => {
    render(
      <UserContext.Provider value={userDetails as any}>
        <CommentCard comment={comment} setComments={setComments} />
      </UserContext.Provider>
    );

    const deleteButton = screen.queryByTestId("deleteButton");

    expect(deleteButton).toBeInTheDocument();
  });

  test("Should not render a delete button for a comment not by user", () => {
    render(
      <UserContext.Provider value={userDetailsBob as any}>
        <CommentCard comment={comment} setComments={setComments} />
      </UserContext.Provider>
    );

    const deleteButton = screen.queryByTestId("deleteButton");

    expect(deleteButton).not.toBeInTheDocument();
  });
});
