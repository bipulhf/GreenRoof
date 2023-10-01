import { useState } from "react";
import { useFollows, useUnfollow } from "../../../hooks/useFollowersFollowings";
import { Link } from "react-router-dom";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
    profilePhoto: string;
}

export default function CommunityWhoToFollow({
    firstName,
    lastName,
    username,
    profilePhoto,
}: Props) {
    const [follow, setFollow] = useState(false);
    const followMutation = useFollows(username);
    const unfollowMutation = useUnfollow(username);

    const onFollow = () => {
        setFollow(!follow);
        if (follow) unfollowMutation.mutate();
        else followMutation.mutate();
    };
    return (
        <div className="flex px-[5%] min-[1200px]:px-[10%] pb-[5%] justify-between">
            <div className="flex">
                <div className="profile-img">
                    <img
                        src={profilePhoto}
                        alt="User Photo"
                        className="max-h-[40px] max-w-[40px] min-h-[40px] min-w- mr-5 rounded-full"
                    />
                </div>
                <Link to={"/community/user/" + username} className="mr-7">
                    <h2 className="font-semibold text-[16px]">
                        {firstName + " " + lastName}
                    </h2>
                    <h3 className="text-gray text-[14px] dark:text-darksecondary">
                        @{username}
                    </h3>
                </Link>
            </div>
            <button
                onClick={onFollow}
                className="self-center h-fit rounded-full bg-greenbtn text-white text-[14px] px-3 py-1"
            >
                {follow ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
}
