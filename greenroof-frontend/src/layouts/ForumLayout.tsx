import { Outlet } from "react-router-dom";
import ForumHeader from "../components/forum/ForumHeader";
import ForumSidebar from "../components/forum/forum_sidebar/ForumSidebar";
import "../components/forum/forum.css";
import ForumMobileMenu from "../components/forum/forum_sidebar/ForumMobileMenu";

export default function ForumLayout() {
    return (
        <div className="relative mx-[10px] lg:mx-[80px] md:mx-[30px] grid grid-cols-12 max-tb:grid-cols-none max-[340px]:break-all">
            <div className="col-span-9">
                <ForumHeader />
                <main className="ml-7">
                    <Outlet />
                </main>
            </div>
            <ForumMobileMenu />
            <ForumSidebar menuOn={false} />
        </div>
    );
}
