import { Outlet } from "react-router-dom";
import CommunityLeftSidebar from "../components/community/community_sidebar/CommunityLeftSidebar";
import CommunityRightSidebar from "../components/community/community_sidebar/CommunityRightSidebar";

export default function CommunityLayout() {
    return (
        <>
            <div className="divide-x divide-graybg">
                <CommunityLeftSidebar />
                <CommunityRightSidebar />
                <Outlet />
            </div>
        </>
    );
}
