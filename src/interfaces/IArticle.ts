export default interface Article {
  author: string;
  title: string;
  article_id: number;
  article_img_url: string;
  body: string;
  comment_count: number;
  created_at: string;
  topic: string;
  votes: number;
}
