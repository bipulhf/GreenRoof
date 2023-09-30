import { createBrowserRouter } from "react-router-dom";
import ForumLayout from "../layouts/ForumLayout";
import ForumMainPage from "../pages/Forum/ForumMainPage";
import ForumSinglePostPage from "../pages/Forum/ForumSinglePostPage";
import ForumUserProfilePage from "../pages/Forum/ForumUserProfilePage";
import ForumCreatePost from "../components/forum/forum_post/ForumCreatePost";
import ForumEditPost from "../components/forum/forum_post/ForumEditPost";
import ForumEditAnswer from "../components/forum/forum_post/ForumEditAnswer";
import CommunityLayout from "../layouts/CommunityLayout";
import CommunityMainPage from "../pages/Community/CommunityMainPage";
import CommunitySinglePostPage from "../pages/Community/CommunitySinglePostPage";
import CommunityUserProfilePage from "../pages/Community/CommunityUserProfilePage";
import CommunitySearchPage from "../pages/Community/CommunitySearchPage";
import CommunityFollowersFollowings from "../components/community/community_profile/CommunityFollowersFollowings";
import CommunityEditPost from "../components/community/community_post/CommunityEditPost";
import CommunityEditComment from "../components/community/community_post/CommunityEditComment";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/home/Login";
import Registration from "../components/home/Registration";
import Home from "../components/home/Home";
import RequireAuth from "../components/RequireAuth";
import Logout from "../components/home/Logout";
import Notifications from "../components/community/Notifications";
import CommunityFollowingFeed from "../components/community/community_feed/CommunityFollowingFeed";
import ForgotPassword from "../components/home/ForgotPassword";
import ResetPassword from "../components/home/ResetPassword";
import ForumTagResult from "../components/forum/forum_sidebar/ForumTagResult";
import Messages from "../pages/Community/Messages";
import MessageUser from "../pages/Community/MessasgeUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Registration /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "logout",
        element: (
          <RequireAuth>
            <Logout />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "forum",
    element: <ForumLayout />,
    children: [
      { index: true, element: <ForumMainPage /> },
      { path: "post/:postId", element: <ForumSinglePostPage /> },
      {
        path: "post/create",
        element: (
          <RequireAuth>
            <ForumCreatePost />
          </RequireAuth>
        ),
      },
      {
        path: "post/edit/:postId",
        element: (
          <RequireAuth>
            <ForumEditPost />
          </RequireAuth>
        ),
      },
      {
        path: "answer/edit/:postId/:answerId",
        element: (
          <RequireAuth>
            <ForumEditAnswer />
          </RequireAuth>
        ),
      },
      { path: "user/:username", element: <ForumUserProfilePage /> },
      { path: "tag/:tag", element: <ForumTagResult /> },
    ],
  },
  {
    path: "community",
    element: (
      <RequireAuth>
        <CommunityLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <CommunityMainPage /> },
      { path: "following", element: <CommunityFollowingFeed /> },
      { path: "post/:postId", element: <CommunitySinglePostPage /> },
      { path: "post/edit/:postId", element: <CommunityEditPost /> },
      {
        path: "comment/edit/:postId/:commentId",
        element: <CommunityEditComment />,
      },
      { path: "user/:username", element: <CommunityUserProfilePage /> },
      {
        path: "user/:username/followers",
        element: <CommunityFollowersFollowings />,
      },
      {
        path: "user/:username/followings",
        element: <CommunityFollowersFollowings />,
      },
      { path: "search", element: <CommunitySearchPage /> },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "community/messages",
    element: <Messages />,
  },
  {
    path: "community/message/:channelName",
    element: <MessageUser />,
  },
]);

export default router;
