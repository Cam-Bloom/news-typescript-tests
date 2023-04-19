export default interface SearchQueries {
  limit: number;
  topic?: "cooking" | "coding" | "football" | "allTopics";
  sort_by: "created_at" | "comment_count" | "votes";
  order: "ASC" | "DESC";
}
