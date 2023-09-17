import { Outlet } from "react-router-dom";
import CommunityLeftSidebar from "../components/community/community_sidebar/CommunityLeftSidebar";
import CommunityRightSidebar from "../components/community/community_sidebar/CommunityRightSidebar";
import CommunityMobileMenu from "../components/community/community_sidebar/CommunityMobileMenu";
import CommunityMobileHeader from "../components/community/community_sidebar/CommunityMobileHeader";

export default function CommunityLayout() {
    return (
        <>
            <CommunityMobileHeader />
            <div className="divide-x divide-graybg">
                <CommunityLeftSidebar />
                <CommunityMobileMenu />
                <CommunityRightSidebar />
                <Outlet />
            </div>
        </>
    );
}
