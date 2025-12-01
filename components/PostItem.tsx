import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Post } from '@/types/post';
import { useAuthStore } from '@/store/authStore';
import { useUserProfileData } from '@/hooks/useProfile';
import ImageViewing from 'react-native-image-viewing';
import { Comment } from '@/types/comment';

interface PostItemProps {
  post: Post;
  onLike: (id: string) => void;
  onComment: (id: string, text: string) => void;
  onUserPress?: (userId: string) => void;
}

export const PostItem = ({ post, onLike, onComment, onUserPress }: PostItemProps) => {
  const { user } = useAuthStore();
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const [isViewerVisible, setIsViewerVisible] = useState(false);

  const authorData = useUserProfileData(post.userId);
  const displayUsername = authorData?.displayName || post.username || "Người dùng";
  const displayAvatar = authorData?.avatarUrl || post.avatarUrl || 'https://via.placeholder.com/50';

  const isLiked = user ? post.likes?.[user.uid] : false;
  const likeCount = post.likes ? Object.keys(post.likes).length : 0;

  const commentsArray = post.comments
    ? Object.keys(post.comments).map(key => {
      const commentData = post.comments![key] as Omit<Comment, 'id'>;
      return { ...commentData, id: key };
    })
    : [];

  const visibleComments = showAllComments ? commentsArray : commentsArray.slice(-2);

  const handleSend = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handlePressUser = () => {
    if (onUserPress) {
      onUserPress(post.userId);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={handlePressUser}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: displayAvatar }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.username}>{displayUsername}</Text>
          <Text style={styles.timestamp}>{new Date(post.timestamp).toLocaleString()}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.content}>{post.content}</Text>

      {post.imageUrl && (
        <TouchableOpacity onPress={() => setIsViewerVisible(true)} activeOpacity={0.9}>
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.postImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

      {post.imageUrl && (
        <ImageViewing
          images={[{ uri: post.imageUrl }]}
          imageIndex={0}
          visible={isViewerVisible}
          onRequestClose={() => setIsViewerVisible(false)}
          swipeToCloseEnabled={true}
          doubleTapToZoomEnabled={true}
        />
      )}

      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => onLike(post.id)} style={styles.actionBtn}>
          <Text style={{ color: isLiked ? 'red' : '#555', fontWeight: 'bold' }}>
            {isLiked ? '❤️' : '🤍'} {likeCount} Thích
          </Text>
        </TouchableOpacity>
        <Text style={styles.commentCount}>{commentsArray.length} Bình luận</Text>
      </View>

      <View style={styles.commentSection}>
        {visibleComments.map((c) => (
          <View key={c.id} style={styles.commentItem}>
            <Text style={styles.commentUser}>{c.username}: </Text>
            <Text style={styles.commentText}>{c.text}</Text>
          </View>
        ))}

        {commentsArray.length > 2 && (
          <TouchableOpacity onPress={() => setShowAllComments(!showAllComments)}>
            <Text style={styles.viewMore}>
              {showAllComments ? "Thu gọn" : `Xem thêm bình luận...`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Viết bình luận..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity onPress={handleSend} disabled={!commentText.trim()}>
          <Text style={{ color: commentText.trim() ? '#007AFF' : '#ccc', fontWeight: 'bold' }}>
            Gửi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', marginBottom: 10, padding: 15, borderRadius: 8 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: '#eee' },
  username: { fontWeight: 'bold', fontSize: 16 },
  timestamp: { color: 'gray', fontSize: 12 },
  content: { fontSize: 15, marginBottom: 10, lineHeight: 22 },
  postImage: { width: '100%', height: 250, borderRadius: 8, marginBottom: 10, backgroundColor: '#eee' },
  actionBar: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee' },
  actionBtn: { padding: 5 },
  commentCount: { padding: 5, color: 'gray' },
  commentSection: { marginVertical: 10 },
  commentItem: { flexDirection: 'row', marginBottom: 5 },
  commentUser: { fontWeight: 'bold', fontSize: 13 },
  commentText: { fontSize: 13, flex: 1 },
  viewMore: { color: 'gray', fontSize: 12, marginTop: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, height: 40, marginRight: 10 },
});