import { useState, useMemo, useEffect } from 'react';
import { updateProfile, signOut } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import { auth, database } from '@/utils/firebase';
import { useAuthStore } from '@/store/authStore';
import { useFeedStore } from '@/store/feedStore';
import { Alert } from 'react-native';
import { UserProfileData, useUserCacheStore } from '@/hooks/useCacheStore'; 

export const useProfile = () => {
  const { user, setUser } = useAuthStore();
  const { posts } = useFeedStore(); 
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const myPosts = useMemo(() => {
    return user ? posts.filter((p) => p.userId === user.uid) : [];
  }, [posts, user]);

  const stats = useMemo(() => {
    let totalLikes = 0;
    let totalComments = 0;

    myPosts.forEach(post => {
      if (post.likes) {
        totalLikes += Object.keys(post.likes).length;
      }
      if (post.comments) {
        totalComments += Object.keys(post.comments).length;
      }
    });

    return { totalLikes, totalComments };
  }, [myPosts]);

  const handleUpdateProfile = async (displayName: string, photoURLText: string) => {
    if (!user) return;
    if (!displayName.trim()) {
        Alert.alert("Lỗi", "Tên hiển thị không được để trống");
        return;
    }

    setLoading(true);
    try {
      const newPhotoURL = photoURLText.trim() || null;
      const newDisplayName = displayName.trim();

      await updateProfile(user, {
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });

      const userRef = ref(database, `users/${user.uid}`);
      await update(userRef, {
        displayName: newDisplayName,
        avatarUrl: newPhotoURL,
      });

      const updatedUser = { ...user, displayName: newDisplayName, photoURL: newPhotoURL };
      setUser(updatedUser);

      useUserCacheStore.setState(state => ({
        users: {
            ...state.users,
            [user.uid]: { uid: user.uid, displayName: newDisplayName, avatarUrl: newPhotoURL || undefined }
        }
      }));

      Alert.alert('Thành công', 'Cập nhật hồ sơ thành công!');
      setIsEditing(false);
    } catch (error: any) {
      console.error("Profile update error:", error);
      Alert.alert('Lỗi cập nhật', error.message || "Có lỗi xảy ra khi cập nhật hồ sơ.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      Alert.alert('Lỗi', error.message);
    }
  };

  return {
    user,
    myPosts,
    stats, 
    isEditing,
    setIsEditing,
    loading,
    handleUpdateProfile,
    handleLogout,
  };
};

export const useUserProfileData = (userId: string) => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const { users, fetchUserData } = useUserCacheStore();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (users[userId]) {
        setUserData(users[userId]);
        return;
      }

      const data = await fetchUserData(userId);
      if (isMounted && data) {
        setUserData(data);
      }
    };

    if (userId) {
      loadData();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, users, fetchUserData]);

  return userData;
};