import { 
  View, Text, StyleSheet, Image, FlatList, 
  ActivityIndicator, TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import { useOtherUserProfile } from '@/hooks/useOtherUserProfile';
import { PostItem } from '@/components/PostItem';
import { useFeedService } from '@/hooks/useFeedService';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfileScreen = () => {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  
  const { userInfo, userPosts, stats, loading } = useOtherUserProfile(userId!);
  const { toggleLike, sendComment } = useFeedService();

  if (loading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  if (!userInfo) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy người dùng này.</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Quay lại</Text>
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: userInfo.avatarUrl || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
      </View>

      <Text style={styles.name}>{userInfo.displayName || "Người dùng ẩn danh"}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userPosts.length}</Text>
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
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem post={item} onLike={toggleLike} onComment={sendComment} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: 'gray' }}>Người dùng này chưa có bài viết nào.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backButton: { position: 'absolute', left: 10, top: 10, zIndex: 10 },
  backText: { color: '#007AFF', fontSize: 16 },
  avatarContainer: { marginBottom: 10, marginTop: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#eee' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 10 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: 'gray', fontSize: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
});

export default UserProfileScreen;