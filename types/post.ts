import { Comment } from './comment';

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatarUrl?: string; 
  content: string;
  imageUrl?: string; 
  likes?: Record<string, boolean>; 
  comments?: Record<string, Omit<Comment, 'id'>>;
  timestamp: number;
}
