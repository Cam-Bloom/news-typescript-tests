import axios from "axios";
import ISearchQueries from "../interfaces/ISearchQueries";

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
    .get(`/articles/${article_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCommentsById = (article_id: any) => {
  return newsApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postComment = (
  article_id: any,
  commentBody: any,
  username: any
) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, {
      body: commentBody,
      username: username,
    })
    .then((data) => {
      return data;
    });
};

export const patchArticleVotes = (article_id: any) => {
  return newsApi
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then((data) => {
      return data;
    });
};

export const fetchTopics = () => {
  return newsApi
    .get(`/topics`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// /api/comments/:comment_id

export const deleteComment = (comment_id: any) => {
  return newsApi.delete(`/comments/${comment_id}`).catch((err) => {
    console.log(err);
  });
};

export const capitalizeFirstLetter = (string: any) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatTopicArr = (arr: any, topic: any) => {
  const arrCopy = [...arr];

  const index = arr.findIndex((topicObj: any) => topic === topicObj.slug);
  const selectedTopic = arrCopy.splice(index, 1);

  const newArr = [...selectedTopic, ...arrCopy];

  return newArr;
};

export const fetchUserByUserId = (username: any) => {
  return newsApi.get(`/users/${username}`).then((data) => {
    return data;
  });
};
