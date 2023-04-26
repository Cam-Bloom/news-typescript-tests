import { fireEvent, render, screen } from "@testing-library/react";
import LoginButton from "./LoginButton";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login Button", () => {
  test("Should render correctly", () => {
    render(<LoginButton />);

    const loginButton = screen.getByText(/login/i);

    expect(loginButton).toBeInTheDocument();
  });

  test("Should navigate when login button is pressed", () => {
    render(<LoginButton />);

    const loginButton = screen.getByText(/login/i);

    fireEvent.click(loginButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
  });

  test("Should navigate when login icon is pressed", () => {
    render(<LoginButton />);

    const loginIcon = screen.getByTestId("login-icon");

    fireEvent.click(loginIcon);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
  });
});
