// Interface for a forum post, based on the 'forum_posts' table.
export interface IForumPost {
  post_id: number;
  topic_id: number;
  user_id: number;
  parent_post_id?: number;
  post_content: string;
  created_at: Date;
  updated_at: Date;
}
