import { useEffect, useState } from "react";
import { useFollows, useUnfollow } from "../../../hooks/useFollowersFollowings";
import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";
import { Link } from "react-router-dom";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
}

export default function CommunityWhoToFollow({
    firstName,
    lastName,
    username,
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
                src={user_profile_photo}
                alt="User Photo"
                className="h-[40px] w-[40px] mr-5"
            />
            <Link to={"/community/user/" + username} className="mr-7">
                <h2 className="font-semibold text-[16px]">
                    {firstName + " " + lastName}
                </h2>
                <h3 className="text-gray text-[14px]">@{username}</h3>
            </Link>
            <button
                onClick={onFollow}
                className="self-center h-fit border rounded-full bg-greenbtn text-white text-[14px] px-3 py-1"
            >
                {follow ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
}
