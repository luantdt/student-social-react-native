import { useEffect } from 'react';
import { database } from '@/utils/firebase';
import { ref, onValue, off, serverTimestamp, push, remove, set } from '@firebase/database';
import { useFeedStore } from '@/store/feedStore';
import { useAuthStore } from '@/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/types/post';

const CACHE_KEY = 'feed_data_cache';

export const useFeedService = () => {
  const { setPosts, setLoading, posts } = useFeedStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const postsRef = ref(database, 'posts');

    const loadCache = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedPosts = JSON.parse(cachedData);
          setPosts(parsedPosts);
        }
      } catch (e) {
        console.error('Lỗi đọc cache AsyncStorage:', e);
      }
    };

    loadCache();

    const unsubscribe = onValue(postsRef, async (snapshot) => {
      setLoading(false);
      const data = snapshot.val();

      if (data) {
        const parsedPosts: Post[] = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => b.timestamp - a.timestamp);

        setPosts(parsedPosts);

        try {
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(parsedPosts));
        } catch (e) {
          console.error('Lỗi lưu cache:', e);
        }
      } else {
        setPosts([]);
      }
    });

    return () => off(postsRef, 'value', unsubscribe);
  }, []);

  const toggleLike = async (postId: string) => {
    if (!user) return;
    const post = posts.find((p) => p.id === postId);
    const isLiked = post?.likes?.[user.uid];
    const likeRef = ref(database, `posts/${postId}/likes/${user.uid}`);

    if (isLiked) {
      await remove(likeRef);
    } else {
      await set(likeRef, true);
    }
  };
  const sendComment = async (postId: string, text: string) => {
    if (!user || !text.trim()) return;

    try {
      const commentsRef = ref(database, `posts/${postId}/comments`);
      const newCommentRef = push(commentsRef);

      await set(newCommentRef, {
        userId: user.uid,
        username: user.displayName || 'Ẩn danh',
        text: text.trim(),
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Lỗi gửi comment:', error);
    }
  };
  const createPost = async (content: string, imageUrl?: string) => {
    if (!user || !content.trim()) return;

    try {
      const postsRef = ref(database, 'posts');
      const newPostRef = push(postsRef); 

      await set(newPostRef, {
        userId: user.uid,
        username: user.displayName || 'Người dùng ẩn danh',
        avatarUrl: user.photoURL || null,
        content: content.trim(),
        imageUrl: imageUrl || null,
        timestamp: serverTimestamp(),
        likes: {},
        comments: {},
      });
    } catch (error) {
      console.error('Lỗi đăng bài:', error);
      throw error; 
    }
  };
  return { toggleLike, sendComment, createPost };
};
