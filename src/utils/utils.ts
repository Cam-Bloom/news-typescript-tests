import axios from "axios";
import ISearchQueries from "../interfaces/ISearchQueries";
import IArticle from "../interfaces/IArticle";
import IComment from "../interfaces/IComment";
import Topics from "../interfaces/Topics";
import ITopic from "../interfaces/ITopic";

export const newsApi = axios.create({
  baseURL: `https://cb-news-api.onrender.com/api`,
});

export const fetchArticles = <T>(searchQueries: Partial<ISearchQueries>) => {
  return newsApi
    .get<T>("/articles", {
      params: {
        limit: searchQueries.limit,
        sort_by: searchQueries.sort_by,
        order: searchQueries.order,
        topic: searchQueries.topic,
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const fetchArticlesById = (article_id: string) => {
  return newsApi
    .get<{ article: IArticle }>(`/articles/${article_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const fetchCommentsById = (article_id: string) => {
  return newsApi
    .get<{ comments: IComment[] }>(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const postComment = (
  article_id: string,
  commentBody: string,
  username: string
) => {
  return newsApi
    .post<{ comment: IComment }>(`/articles/${article_id}/comments`, {
      body: commentBody,
      username: username,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const patchArticleVotes = (article_id: string) => {
  return newsApi
    .patch<{ article: IArticle }>(`/articles/${article_id}`, { inc_votes: 1 })
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const fetchTopics = () => {
  return newsApi
    .get<{ topics: ITopic[] }>(`/topics`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const deleteComment = (comment_id: number) => {
  return newsApi.delete(`/comments/${comment_id}`).catch((err) => {
    console.log(err);
    throw err;
  });
};

export const fetchUserByUserId = (username: string) => {
  return newsApi.get(`/users/${username}`).then((data) => {
    return data;
  });
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatTopicArr = (arr: ITopic[], topic: Topics): ITopic[] => {
  const arrCopy = [...arr];

  const index = arr.findIndex((topicObj) => topic === topicObj.slug);
  const selectedTopic = arrCopy.splice(index, 1);

  const newArr = [...selectedTopic, ...arrCopy];

  return newArr;
};
