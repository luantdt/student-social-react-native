import { Post } from '@/types/post';
import { create } from 'zustand';

interface FeedState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  isLoading: true,
  setPosts: (posts) => set({ posts }),
  setLoading: (loading) => set({ isLoading: loading }),
}));