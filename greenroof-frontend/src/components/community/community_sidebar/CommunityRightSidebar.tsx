import CommunityWhoToFollow from "./CommunityWhoToFollow";

export default function CommunityRightSidebar() {
    return (
        <div className="max-[1000px]:hidden min-h-screen fixed w-[25%] ml-[75%] pt-[5%]">
            <h2 className="font-bold text-2xl px-[8%] pb-[5%]">
                Who to follow
            </h2>
            <CommunityWhoToFollow />
            <CommunityWhoToFollow />
            <CommunityWhoToFollow />
            <CommunityWhoToFollow />
            <CommunityWhoToFollow />
            <CommunityWhoToFollow />
            <CommunityWhoToFollow />
        </div>
    );
}
