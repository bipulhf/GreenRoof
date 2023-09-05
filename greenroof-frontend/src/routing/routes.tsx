import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ForumLayout from "../layouts/ForumLayout";
import ForumMainPage from "../pages/Forum/ForumMainPage";
import ForumSinglePostPage from "../pages/Forum/ForumSinglePostPage";
import ForumUserProfilePage from "../pages/Forum/ForumUserProfilePage";
import ForumSearchPage from "../pages/Forum/ForumSearchPage";

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    {
        path: "forum",
        element: <ForumLayout />,
        children: [
            { index: true, element: <ForumMainPage /> },
            { path: "post/:postId", element: <ForumSinglePostPage /> },
            { path: "user/:username", element: <ForumUserProfilePage /> },
            { path: "search", element: <ForumSearchPage /> },
        ],
    },
]);

export default router;
