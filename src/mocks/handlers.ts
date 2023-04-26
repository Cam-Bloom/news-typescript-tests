import { rest } from "msw";
import articlesRes from "./data/articlesRes";
import commentRes from "./data/commentRes";
import singleArticleRes from "./data/singleArticleRes";
import topicsRes from "./data/topicRes";

export const handlers = [
  rest.get("https://cb-news-api.onrender.com/api/articles", (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");

    const articlesResLimit = { ...articlesRes };

    if (limit) {
      articlesResLimit.articles = articlesResLimit.articles.slice(
        0,
        parseInt(limit)
      );
    }

    return res(ctx.status(200), ctx.json(articlesResLimit));
  }),

  rest.get(
    "https://cb-news-api.onrender.com/api/articles/:id/comments",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(commentRes));
    }
  ),

  rest.get(
    "https://cb-news-api.onrender.com/api/articles/:id",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(singleArticleRes));
    }
  ),

  rest.delete(
    "https://cb-news-api.onrender.com/api/comments/:comment_id",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),

  rest.post(
    "https://cb-news-api.onrender.com/api/articles/:article_id/comments",
    (req, res, ctx) => {
      return res(ctx.status(201));
    }
  ),
  rest.get("https://cb-news-api.onrender.com/api/topics", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(topicsRes));
  }),
];
