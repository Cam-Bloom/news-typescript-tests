import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Home from "./Home";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  Link: jest.fn(),
}));

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: any }) => (
    <div data-testid="Swiper-testId">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: any }) => (
    <div data-testid="SwiperSlide-testId">{children}</div>
  ),
}));

jest.mock("swiper", () => ({
  Navigation: (props: any) => null,
  Autoplay: (props: any) => null,
}));

test('Update search queries to show all articles when "show more button pressed"', async () => {
  render(<Home />);

  const ShowMoreButton = await screen.findByTestId("show-more-button");

  fireEvent.click(ShowMoreButton);

  const listItems = await screen.findAllByRole("listitem");

  await expect(listItems.length).toBeGreaterThan(10);
});
