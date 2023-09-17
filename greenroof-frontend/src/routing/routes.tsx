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
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    {
        path: "forum",
        element: <ForumLayout />,
        children: [
            { index: true, element: <ForumMainPage /> },
            { path: "post/:postId", element: <ForumSinglePostPage /> },
            { path: "post/create", element: <ForumCreatePost /> },
            { path: "post/edit/:postId", element: <ForumEditPost /> },
            {
                path: "answer/edit/:postId/:answerId",
                element: <ForumEditAnswer />,
            },
            { path: "user/:username", element: <ForumUserProfilePage /> },
        ],
    },
    {
        path: "community",
        element: <CommunityLayout />,
        children: [
            { index: true, element: <CommunityMainPage /> },
            { path: "post/:postId", element: <CommunitySinglePostPage /> },
            { path: "post/create", element: <ForumCreatePost /> },
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
        ],
    },
]);

export default router;
