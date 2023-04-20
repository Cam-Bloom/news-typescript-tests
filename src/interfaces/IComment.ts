export default interface IComment {
  author: string;
  article_id?: number;
  comment_id: number;
  body: string;
  created_at?: string;
  votes?: number;
}
