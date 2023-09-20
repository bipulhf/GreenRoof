import { useFollowingRecommendation } from "../../../hooks/useProfile";
import CommunityWhoToFollow from "./CommunityWhoToFollow";
import CommunityWhoToFollowLoader from "./CommunityWhoToFollowLoader";

export default function CommunityRightSidebar() {
    const {
        data: users,
        isLoading,
        isError,
        error,
    } = useFollowingRecommendation();
    return (
        <div className="max-[1000px]:hidden min-h-screen fixed w-[25%] ml-[75%] pt-[5%]">
            <h2 className="font-bold text-2xl px-[8%] pb-[5%]">
                Who to follow
            </h2>
            {isLoading && <CommunityWhoToFollowLoader />}
            {isError && <p>{error.message}</p>}
            {users?.map((user) => (
                <CommunityWhoToFollow
                    firstName={user.firstName}
                    lastName={user.lastName}
                    username={user.username}
                />
            ))}
        </div>
    );
}
