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

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Registration /> },
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
