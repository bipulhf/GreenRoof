import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/home/Home";
import RequireAuth from "../components/RequireAuth";
const ForumLayout = React.lazy(() => import("../layouts/ForumLayout"));
const ForumMainPage = React.lazy(() => import("../pages/Forum/ForumMainPage"));
const ForumSinglePostPage = React.lazy(
    () => import("../pages/Forum/ForumSinglePostPage")
);
const ForumUserProfilePage = React.lazy(
    () => import("../pages/Forum/ForumUserProfilePage")
);
const ForumCreatePost = React.lazy(
    () => import("../components/forum/forum_post/ForumCreatePost")
);
const ForumEditPost = React.lazy(
    () => import("../components/forum/forum_post/ForumEditPost")
);
const ForumEditAnswer = React.lazy(
    () => import("../components/forum/forum_post/ForumEditAnswer")
);
const CommunityLayout = React.lazy(() => import("../layouts/CommunityLayout"));
const CommunityMainPage = React.lazy(
    () => import("../pages/Community/CommunityMainPage")
);
const CommunitySinglePostPage = React.lazy(
    () => import("../pages/Community/CommunitySinglePostPage")
);
const CommunityUserProfilePage = React.lazy(
    () => import("../pages/Community/CommunityUserProfilePage")
);
const CommunitySearchPage = React.lazy(
    () => import("../pages/Community/CommunitySearchPage")
);
const CommunityFollowersFollowings = React.lazy(
    () =>
        import(
            "../components/community/community_profile/CommunityFollowersFollowings"
        )
);
const CommunityEditPost = React.lazy(
    () => import("../components/community/community_post/CommunityEditPost")
);
const CommunityEditComment = React.lazy(
    () => import("../components/community/community_post/CommunityEditComment")
);
const Logout = React.lazy(() => import("../components/home/Logout"));
const Notifications = React.lazy(
    () => import("../components/community/Notifications")
);
const PushNotifications = React.lazy(
    () => import("../components/community/PushNotifications")
);
const CommunityFollowingFeed = React.lazy(
    () =>
        import("../components/community/community_feed/CommunityFollowingFeed")
);
const ForgotPassword = React.lazy(
    () => import("../components/home/ForgotPassword")
);
const ResetPassword = React.lazy(
    () => import("../components/home/ResetPassword")
);
const ForumTagResult = React.lazy(
    () => import("../components/forum/forum_sidebar/ForumTagResult")
);
const NotFound = React.lazy(() => import("../components/NotFound"));

const Registration = React.lazy(
    () => import("../components/home/Registration")
);
const Login = React.lazy(() => import("../components/home/Login"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "login",
                element: (
                    <Suspense fallback="">
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "register",
                element: (
                    <Suspense fallback="">
                        <Registration />
                    </Suspense>
                ),
            },
            {
                path: "reset-password",
                element: (
                    <Suspense fallback="">
                        <ResetPassword />
                    </Suspense>
                ),
            },
            {
                path: "forgot-password",
                element: (
                    <Suspense fallback="">
                        <ForgotPassword />
                    </Suspense>
                ),
            },
            {
                path: "logout",
                element: (
                    <RequireAuth>
                        <Suspense fallback="">
                            <Logout />
                        </Suspense>
                    </RequireAuth>
                ),
            },
        ],
    },
    {
        path: "forum",
        element: (
            <Suspense fallback="">
                <ForumLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback="">
                        <ForumMainPage />
                    </Suspense>
                ),
            },
            {
                path: "post/:postId",
                element: (
                    <Suspense fallback="">
                        <ForumSinglePostPage />
                    </Suspense>
                ),
            },
            {
                path: "post/create",
                element: (
                    <RequireAuth>
                        <Suspense fallback="">
                            <ForumCreatePost />
                        </Suspense>
                    </RequireAuth>
                ),
            },
            {
                path: "post/edit/:postId",
                element: (
                    <RequireAuth>
                        <Suspense fallback="">
                            <ForumEditPost />
                        </Suspense>
                    </RequireAuth>
                ),
            },
            {
                path: "answer/edit/:postId/:answerId",
                element: (
                    <RequireAuth>
                        <Suspense fallback="">
                            <ForumEditAnswer />
                        </Suspense>
                    </RequireAuth>
                ),
            },
            {
                path: "user/:username",
                element: (
                    <Suspense fallback="">
                        <ForumUserProfilePage />
                    </Suspense>
                ),
            },
            {
                path: "tag/:tag",
                element: (
                    <Suspense fallback="">
                        <ForumTagResult />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "community",
        element: (
            <RequireAuth>
                <Suspense fallback="">
                    <CommunityLayout />
                </Suspense>
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback="">
                        <CommunityMainPage />
                    </Suspense>
                ),
            },
            {
                path: "following",
                element: (
                    <Suspense fallback="">
                        <CommunityFollowingFeed />
                    </Suspense>
                ),
            },
            {
                path: "post/:postId",
                element: (
                    <Suspense fallback="">
                        <CommunitySinglePostPage />
                    </Suspense>
                ),
            },
            {
                path: "post/edit/:postId",
                element: (
                    <Suspense fallback="">
                        <CommunityEditPost />
                    </Suspense>
                ),
            },
            {
                path: "comment/edit/:postId/:commentId",
                element: (
                    <Suspense fallback="">
                        <CommunityEditComment />
                    </Suspense>
                ),
            },
            {
                path: "user/:username",
                element: (
                    <Suspense fallback="">
                        <CommunityUserProfilePage />
                    </Suspense>
                ),
            },
            {
                path: "user/:username/followers",
                element: (
                    <Suspense fallback="">
                        <CommunityFollowersFollowings />
                    </Suspense>
                ),
            },
            {
                path: "user/:username/followings",
                element: (
                    <Suspense fallback="">
                        <CommunityFollowersFollowings />
                    </Suspense>
                ),
            },
            {
                path: "search",
                element: (
                    <Suspense fallback="">
                        <CommunitySearchPage />
                    </Suspense>
                ),
            },
            {
                path: "notifications",
                element: (
                    <Suspense fallback="">
                        <Notifications />
                    </Suspense>
                ),
            },
            {
                path: "push-notifications",
                element: (
                    <Suspense fallback="">
                        <PushNotifications />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "*",
        element: (
            <Suspense fallback="">
                <NotFound />
            </Suspense>
        ),
    },
]);

export default router;
