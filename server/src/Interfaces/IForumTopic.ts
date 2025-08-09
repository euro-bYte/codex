// Interface for a forum topic, based on the 'forum_topics' table.
export interface IForumTopic {
  topic_id: number;
  user_id: number;
  topic_title: string;
  created_at: Date;
  updated_at: Date;
}
