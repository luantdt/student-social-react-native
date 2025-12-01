# Ứng dụng Mạng xã hội Sinh viên

Đây là một dự án ứng dụng di động được xây dựng bằng React Native và Expo, đóng vai trò như một nền tảng mạng xã hội thu nhỏ dành cho sinh viên. Ứng dụng cho phép người dùng kết nối, chia sẻ những khoảnh khắc và tương tác với nhau một cách dễ dàng.

## Tính năng chính

- **Xác thực người dùng:** Đăng ký tài khoản mới và đăng nhập an toàn.
- **Bảng tin (News Feed):** Xem các bài đăng mới nhất từ những người dùng khác.
- **Đăng bài viết:** Tạo và chia sẻ bài viết của riêng bạn.
- **Bình luận:** Tương tác với các bài viết bằng cách để lại bình luận.
- **Xem thông tin cá nhân:** Xem và quản lý trang thông tin cá nhân của bạn.
- **Xem trang cá nhân của người khác:** Khám phá và xem thông tin của những người dùng khác trong cộng đồng.

## Công nghệ sử dụng

- **Framework:** React Native & Expo
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS (với NativeWind)
- **Routing:** Expo Router v3
- **Backend & Dữ liệu:** Firebase (Authentication, Firestore, Storage)
- **Quản lý State:** Zustand/Context API (dựa trên cấu trúc thư mục `store`)

## Cấu trúc thư mục

Dự án được tổ chức theo cấu trúc module hóa để dễ dàng bảo trì và phát triển:

- **/app**: Chứa các màn hình và logic điều hướng (routing) sử dụng Expo Router.
  - **(auth)**: Nhóm các màn hình liên quan đến xác thực (Đăng nhập, Đăng ký).
  - **(tab)**: Nhóm các màn hình chính sau khi đăng nhập (Bảng tin, Profile).
- **/assets**: Lưu trữ các tài nguyên tĩnh như hình ảnh, fonts, và animations.
- **/components**: Chứa các UI component có thể tái sử dụng trong toàn bộ ứng dụng.
- **/common**: Các thành phần giao diện chung như Button, Input.
- **/hooks**: Các custom hooks để chứa logic phức tạp và tái sử dụng (ví dụ: `useAuthService`, `useFeedService`).
- **/services**: Nơi xử lý các tác vụ giao tiếp với bên ngoài, cụ thể là Firebase.
- **/store**: Quản lý trạng thái (state) của ứng dụng.
- **/types**: Định nghĩa các kiểu dữ liệu TypeScript cho toàn dự án (Post, Comment,...).
- **/utils**: Chứa các hàm tiện ích, ví dụ như cấu hình khởi tạo Firebase.

## Bắt đầu

Để chạy dự án trên máy của bạn, hãy làm theo các bước sau:

1.  **Clone a repository:**
    ```bash
    git clone "https://github.com/luantdt/student-social-react-native.git"
    cd student-social-react-native
    ```

2.  **Cài đặt các gói phụ thuộc:**
    ```bash
    npm install
    # hoặc
    yarn install
    ```

3.  **Cấu hình Firebase:**
    Mở file `utils/firebase.ts` và thay thế các thông tin cấu hình (`apiKey`, `authDomain`, `projectId`, ...) bằng thông tin từ project Firebase của bạn.

4.  **Chạy ứng dụng:**
    ```bash
    npx expo start
    ```
    Sau đó, dùng ứng dụng Expo Go trên điện thoại của bạn để quét mã QR.
