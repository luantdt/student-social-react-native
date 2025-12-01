import React, { useState } from 'react';
import { FlatList, View, ActivityIndicator, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFeedStore } from '@/store/feedStore';
import { useFeedService } from '@/hooks/useFeedService';
import { PostItem } from '@/components/PostItem';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

const CreatePostBox = ({ onCreate }: { onCreate: (content: string, img: string) => void }) => {
  const [text, setText] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handlePost = () => {
    if (text.trim()) {
      onCreate(text, imgUrl);
      setText('');
      setImgUrl('');
    }
  };

  return (
    <View style={styles.createBox}>
      <TextInput
        style={styles.createInput}
        placeholder="Bạn đang nghĩ gì?"
        value={text}
        onChangeText={setText}
        multiline
      />
      <TextInput
        style={[styles.createInput, { height: 35, marginTop: 5 }]}
        placeholder="Link hình ảnh (https://...)"
        value={imgUrl}
        onChangeText={setImgUrl}
      />
      <TouchableOpacity
        style={[styles.postBtn, { opacity: text.trim() ? 1 : 0.5 }]}
        onPress={handlePost}
        disabled={!text.trim()}
      >
        <Text style={styles.postBtnText}>Đăng bài</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function NewFeed() {
  const router = useRouter();
  const { user: currentUser } = useAuthStore();
  const { posts, isLoading } = useFeedStore();
  const { toggleLike, sendComment, createPost } = useFeedService();

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
  const handleUserPress = (userId: string) => {
    if (currentUser && userId === currentUser.uid) {
      router.push('/profile'); 
      return;
    }

    router.push({
      pathname: '/(tab)/user', 
      params: { userId: userId }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<CreatePostBox onCreate={createPost} />}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            onLike={toggleLike}
            onComment={sendComment}
            onUserPress={handleUserPress}
          />
        )}
        contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  createBox: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15 },
  createInput: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, height: 60, textAlignVertical: 'top' },
  postBtn: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  postBtnText: { color: 'white', fontWeight: 'bold' }
});