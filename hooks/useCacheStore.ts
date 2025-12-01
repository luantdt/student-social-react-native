import { create } from 'zustand';
import { database } from '@/utils/firebase';
import { ref, get as firebaseGet } from 'firebase/database';

export interface UserProfileData {
  uid: string;
  displayName: string;
  avatarUrl?: string;
}

interface UserCacheState {
  users: Record<string, UserProfileData>; 
  fetchUserData: (userId: string) => Promise<UserProfileData | null>;
}

export const useUserCacheStore = create<UserCacheState>((set, get) => ({
  users: {},
  fetchUserData: async (userId: string) => {
    const cachedUser = get().users[userId];
    if (cachedUser) {
      return cachedUser;
    }

    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await firebaseGet(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val() as UserProfileData;
        set((state) => ({
          users: { ...state.users, [userId]: userData },
        }));
        return userData;
      }
    } catch (error) {
      console.error(`Lỗi fetch user ${userId}:`, error);
    }
    return null;
  },
}));