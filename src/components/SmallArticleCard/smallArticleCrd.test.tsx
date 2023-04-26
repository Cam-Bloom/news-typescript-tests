import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import SmallArticleCard from "./SmallArticleCard";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const article = {
  author: "grumpy19",
  title: "The Notorious MSG’s Unlikely Formula For Success",
  article_id: 34,
  body: "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
  topic: "cooking",
  created_at: "2020-11-22T11:13:00.000Z",
  votes: 18,
  article_img_url:
    "https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700",
  comment_count: 14,
};

describe("Small Article Container", () => {
  test("Renders Heading Correctly", () => {
    render(<SmallArticleCard article={article} />);
    const articleHeader = screen.getByRole("heading", {
      name: /the notorious msg’s unlikely formula for success/i,
    });

    expect(articleHeader).toBeInTheDocument();
  });

  test("When topic button is pressed should navigate", async () => {
    render(<SmallArticleCard article={article} />);

    const TopicButton = screen.getByRole("heading", {
      name: /cooking/i,
    });

    await user.click(TopicButton);

    expect(mockedUsedNavigate).toBeCalledWith(`/topics/cooking`);
  });

  test('When "read more" button is pressed should navigate', async () => {
    render(<SmallArticleCard article={article} />);

    const ReadMoreButton = screen.getByTestId("read-more-button");

    await user.click(ReadMoreButton);

    expect(mockedUsedNavigate).toBeCalledWith(`/article/34`);
  });
});
