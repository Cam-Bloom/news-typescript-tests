import { fireEvent, render, screen } from "@testing-library/react";
import TopicSelect from "./TopicSelect";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: any }) => (
    <div data-testid="Swiper-testId">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: any }) => (
    <div data-testid="SwiperSlide-testId">{children}</div>
  ),
}));

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => {
    return { topic: "allTopics" };
  },
}));

describe("Topic Select", () => {
  test("Should render correctly", async () => {
    render(<TopicSelect />);

    await screen.findByText("Coding");
    const header = screen.getByText("Topics");

    expect(header).toBeInTheDocument();
  });

  test("When topic is picked should navigate to relevant page", async () => {
    render(<TopicSelect />);

    const codingButton = await screen.findByText("Coding");

    fireEvent.click(codingButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/topics/coding");
  });
});
