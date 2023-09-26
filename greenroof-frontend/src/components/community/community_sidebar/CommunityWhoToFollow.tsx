import { useEffect, useState } from "react";
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
        if (follow) unfollowMutation.mutate();
        else followMutation.mutate();
    };
    useEffect(() => {
        if (followMutation.isSuccess || unfollowMutation.isSuccess)
            setFollow(!follow);
    }, [followMutation.isSuccess, unfollowMutation.isSuccess]);
    return (
        <div className="flex px-[5%] min-[1200px]:px-[10%] pb-[5%]">
            <img
                src={profilePhoto}
                alt="User Photo"
                className="h-[40px] w-[40px] mr-5 rounded-full"
            />
            <Link to={"/community/user/" + username} className="mr-7">
                <h2 className="font-semibold text-[16px]">
                    {firstName + " " + lastName}
                </h2>
                <h3 className="text-gray text-[14px] dark:text-darksecondary">
                    @{username}
                </h3>
            </Link>
            <button
                onClick={onFollow}
                className="self-center h-fit rounded-full bg-greenbtn text-white text-[14px] px-3 py-1"
            >
                {follow ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
}
