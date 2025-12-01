import { useState, useEffect, useMemo } from 'react';
import { useFeedStore } from '@/store/feedStore';
import { UserProfileData, useUserCacheStore } from './useCacheStore';

export const useOtherUserProfile = (userId: string) => {
  const { posts } = useFeedStore(); 
  const { fetchUserData, users } = useUserCacheStore();
  const [userInfo, setUserInfo] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (users[userId]) {
        setUserInfo(users[userId]);
        setLoading(false);
        return;
      }
      const data = await fetchUserData(userId);
      setUserInfo(data);
      setLoading(false);
    };

    if (userId) loadData();
  }, [userId, users]);

  const userPosts = useMemo(() => {
    return posts.filter((p) => p.userId === userId);
  }, [posts, userId]);

  const stats = useMemo(() => {
    let totalLikes = 0;
    let totalComments = 0;

    userPosts.forEach(post => {
      if (post.likes) totalLikes += Object.keys(post.likes).length;
      if (post.comments) totalComments += Object.keys(post.comments).length;
    });

    return { totalLikes, totalComments };
  }, [userPosts]);

  return { userInfo, userPosts, stats, loading };
};