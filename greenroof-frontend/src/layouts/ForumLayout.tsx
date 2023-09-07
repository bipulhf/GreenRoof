import { Outlet } from "react-router-dom";
import ForumHeader from "../components/forum/ForumHeader";
import ForumSidebar from "../components/forum/forum_sidebar/ForumSidebar";
import "../components/forum/forum.css";

export default function ForumLayout() {
    return (
        <div className="mx-[10px] lg:mx-[80px] md:mx-[30px] grid grid-cols-12 max-tb:grid-cols-none break-all">
            <div className="col-span-9">
                <ForumHeader />
                <main className="ml-7">
                    <Outlet />
                </main>
            </div>
            <ForumSidebar />
        </div>
    );
}
