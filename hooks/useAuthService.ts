import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useAuthStore } from '@/store/authStore'; 

export const useAuthService = () => {
  const { setUser, setLoading } = useAuthStore();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [setUser, setLoading]); 
};