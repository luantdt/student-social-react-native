import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  FlatList, Modal, TextInput, ActivityIndicator
} from 'react-native';

import React, { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { PostItem } from '@/components/PostItem'; 
import { useFeedService } from '@/hooks/useFeedService';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const {
    user, myPosts, stats, 
    isEditing, setIsEditing, loading,
    handleUpdateProfile, handleLogout
  } = useProfile();

  const { toggleLike, sendComment } = useFeedService();

  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  useEffect(() => {
    if (isEditing && user) {
      setEditName(user.displayName || '');
      setEditAvatar(user.photoURL || '');
    }
  }, [isEditing, user]);

  if (!user) return <View style={styles.center}><Text>Vui lòng đăng nhập</Text></View>;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user.photoURL || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <TouchableOpacity
          style={styles.editIconBtn}
          onPress={() => setIsEditing(true)}
        >
          <Text style={{ fontSize: 12 }}>✏️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{user.displayName || "Chưa đặt tên"}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{myPosts.length}</Text>
          <Text style={styles.statLabel}>Bài viết</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.totalLikes}</Text>
          <Text style={styles.statLabel}>Lượt thích</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.totalComments}</Text>
          <Text style={styles.statLabel}>Bình luận</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => setIsEditing(true)}>
          <Text style={styles.btnTextSecondary}>Chỉnh sửa trang cá nhân</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnTextLogout}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={myPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem post={item} onLike={toggleLike} onComment={sendComment} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: 'gray' }}>Bạn chưa có bài viết nào.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={isEditing} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cập nhật hồ sơ</Text>
            <Text style={styles.subTitle}>Nhập URL hình ảnh (ví dụ từ imgur,...) thay vì upload file.</Text>

            <Text style={styles.label}>Tên hiển thị:</Text>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
            />

            <Text style={styles.label}>Avatar URL:</Text>
            <TextInput
              style={styles.input}
              value={editAvatar}
              onChangeText={setEditAvatar}
              placeholder="https://example.com/my-avatar.jpg"
              autoCapitalize="none"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.btnModal, { backgroundColor: '#ccc' }]}
                onPress={() => setIsEditing(false)}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnModal, { backgroundColor: '#007AFF' }]}
                onPress={() => handleUpdateProfile(editName, editAvatar)}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white' }}>Lưu</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatarContainer: { position: 'relative', marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#eee' },
  editIconBtn: { position: 'absolute', right: 0, bottom: 0, backgroundColor: '#eee', padding: 5, borderRadius: 15, borderWidth: 1, borderColor: 'white' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  email: { color: 'gray', marginBottom: 15 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: 'gray', fontSize: 12 },
  actionRow: { flexDirection: 'row', gap: 10 },
  btnSecondary: { backgroundColor: '#f0f0f0', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  btnTextSecondary: { fontWeight: '600' },
  btnLogout: { backgroundColor: '#ffe5e5', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  btnTextLogout: { color: 'red', fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  subTitle: { fontSize: 12, color: 'gray', marginBottom: 15, textAlign: 'center' },
  label: { fontWeight: '600', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, marginBottom: 15 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  btnModal: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
});

export default ProfileScreen;