import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/home/Home";
import RequireAuth from "../components/RequireAuth";
import PopupLoading from "../components/PopupLoading";
const MessageUser = React.lazy(() => import("../pages/Community/MessasgeUser"));
const Messages = React.lazy(() => import("../pages/Community/Messages"));
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
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "register",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <Registration />
                    </Suspense>
                ),
            },
            {
                path: "reset-password",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <ResetPassword />
                    </Suspense>
                ),
            },
            {
                path: "forgot-password",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <ForgotPassword />
                    </Suspense>
                ),
            },
            {
                path: "logout",
                element: (
                    <RequireAuth>
                        <Suspense
                            fallback={
                                <div className="w-full h-screen flex content-center justify-center">
                                    <PopupLoading />
                                </div>
                            }
                        >
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
            <Suspense
                fallback={
                    <div className="w-full h-screen flex content-center justify-center">
                        <PopupLoading />
                    </div>
                }
            >
                <ForumLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <ForumMainPage />
                    </Suspense>
                ),
            },
            {
                path: "post/:postId",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <ForumSinglePostPage />
                    </Suspense>
                ),
            },
            {
                path: "post/create",
                element: (
                    <RequireAuth>
                        <Suspense
                            fallback={
                                <div className="w-full h-screen flex content-center justify-center">
                                    <PopupLoading />
                                </div>
                            }
                        >
                            <ForumCreatePost />
                        </Suspense>
                    </RequireAuth>
                ),
            },
            {
                path: "post/edit/:postId",
                element: (
                    <RequireAuth>
                        <Suspense
                            fallback={
                                <div className="w-full h-screen flex content-center justify-center">
                                    <PopupLoading />
                                </div>
                            }
                        >
                            <ForumEditPost />
                        </Suspense>
                    </RequireAuth>
                ),
            },
            {
                path: "answer/edit/:postId/:answerId",
                element: (
                    <RequireAuth>
                        <Suspense
                            fallback={
                                <div className="w-full h-screen flex content-center justify-center">
                                    <PopupLoading />
                                </div>
                            }
                        >
                            <ForumEditAnswer />
                        </Suspense>
                    </RequireAuth>
                ),
            },
            {
                path: "user/:username",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <ForumUserProfilePage />
                    </Suspense>
                ),
            },
            {
                path: "tag/:tag",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
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
                <Suspense
                    fallback={
                        <div className="w-full h-screen flex content-center justify-center">
                            <PopupLoading />
                        </div>
                    }
                >
                    <CommunityLayout />
                </Suspense>
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunityMainPage />
                    </Suspense>
                ),
            },
            {
                path: "following",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunityFollowingFeed />
                    </Suspense>
                ),
            },
            {
                path: "post/:postId",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunitySinglePostPage />
                    </Suspense>
                ),
            },
            {
                path: "post/edit/:postId",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunityEditPost />
                    </Suspense>
                ),
            },
            {
                path: "comment/edit/:postId/:commentId",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunityEditComment />
                    </Suspense>
                ),
            },
            {
                path: "user/:username",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunityUserProfilePage />
                    </Suspense>
                ),
            },
            {
                path: "user/:username/followers",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunityFollowersFollowings />
                    </Suspense>
                ),
            },
            {
                path: "user/:username/followings",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunityFollowersFollowings />
                    </Suspense>
                ),
            },
            {
                path: "search",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <CommunitySearchPage />
                    </Suspense>
                ),
            },
            {
                path: "notifications",
                element: (
                    <Suspense
                        fallback={
                            <div className="w-full h-screen flex content-center justify-center">
                                <PopupLoading />
                            </div>
                        }
                    >
                        <Notifications />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "community/messages",
        element: (
            <Suspense
                fallback={
                    <div className="w-full h-screen flex content-center justify-center">
                        <PopupLoading />
                    </div>
                }
            >
                <Messages />
            </Suspense>
        ),
    },
    {
        path: "community/message/:userId",
        element: (
            <Suspense
                fallback={
                    <div className="w-full h-screen flex content-center justify-center">
                        <PopupLoading />
                    </div>
                }
            >
                <MessageUser />
            </Suspense>
        ),
    },
    {
        path: "*",
        element: (
            <Suspense
                fallback={
                    <div className="w-full h-screen flex content-center justify-center">
                        <PopupLoading />
                    </div>
                }
            >
                <NotFound />
            </Suspense>
        ),
    },
]);

export default router;
