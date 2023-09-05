import { Outlet } from "react-router-dom";
import ForumHeader from "../components/forum/ForumHeader";
import ForumSidebar from "../components/forum/ForumSidebar";
import "../components/forum/forum.css";

export default function ForumLayout() {
    return (
        <div className="mx-[10px] lg:ml-[60px] lg:mr-[100px] md:mx-[30px] grid grid-cols-12 max-md:grid-cols-none">
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
