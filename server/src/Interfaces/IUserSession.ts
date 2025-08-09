// Interface for user sessions, based on the 'user_sessions' table.
export interface IUserSession {
  session_id: number;
  user_id: number;
  token: string;
  created_at: Date;
  expires_at: Date;
}
