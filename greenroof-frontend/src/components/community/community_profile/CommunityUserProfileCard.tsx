import { Link, useParams } from "react-router-dom";
import user_photo from "/assets/forum/user_profile_photo_104x104.png";
import { useEffect, useState } from "react";
import {
    useFollows,
    useIsFollow,
    useUnfollow,
} from "../../../hooks/useFollowersFollowings";
import useAuth from "../../../hooks/useAuth";

interface Props {
    firstname: string;
    lastname: string;
    username: string;
    city: string;
    followers: number;
    followings: number;
}

export default function CommunityUserProfileCard({
    firstname,
    lastname,
    username,
    city,
    followers,
    followings,
}: Props) {
    const { auth } = useAuth();
    const { username: uname } = useParams();
    const [follow, setFollow] = useState(false);
    const { data: isFollow } = useIsFollow(uname || "");
    const followMutation = useFollows(uname || "");
    const unfollowMutation = useUnfollow(uname || "");

    const onFollow = () => {
        if (follow) unfollowMutation.mutate();
        else followMutation.mutate();
    };
    useEffect(() => {
        setFollow(isFollow?.isFollow || false);
    }, [isFollow]);
    useEffect(() => {
        if (followMutation.isSuccess || unfollowMutation.isSuccess)
            setFollow(!follow);
    }, [followMutation.isSuccess, unfollowMutation.isSuccess]);
    return (
        <>
            <div className="sm:flex justify-evenly py-7">
                <div className="flex ml-5">
                    <img
                        src={user_photo}
                        alt="User Photo"
                        className="max-[490px]:w-[80px] max-[490px]:h-[80px] w-[104px] h-[104px]"
                    />
                    <div className="ml-5 self-center">
                        <h2 className="font-semibold text-[22px] max-[490px]:text-[18px] ">
                            {firstname + " " + lastname}
                        </h2>
                        <h3 className="text-gray font-medium max-[490px]:text-[15px] text-[18px]">
                            @{username}
                        </h3>
                        <h3 className="text-[16px] max-[490px]:text-[14px] ">
                            From {city}
                        </h3>
                    </div>
                    {auth.name != uname && (
                        <button
                            onClick={onFollow}
                            className="min-[415px]:hidden self-center h-fit border rounded-full bg-greenbtn text-white text-[13px] md:text-[16px] px-3 md:px-5 py-1 md:py-2 ml-[20%]"
                        >
                            {follow ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>
                {auth.name != uname && (
                    <button
                        onClick={onFollow}
                        className="max-[1110px]:hidden self-center h-fit border rounded-full bg-greenbtn text-white text-[13px] lg:text-[16px] px-3 lg:px-5 py-1 lg:py-2"
                    >
                        {follow ? "Unfollow" : "Follow"}
                    </button>
                )}
                <div className="flex flex-col max-sm:mt-5 justify-evenly">
                    {auth.name != uname && (
                        <button
                            onClick={onFollow}
                            className="min-[1110px]:hidden max-[414px]:hidden self-center h-fit border rounded-full bg-greenbtn text-white text-[13px] md:text-[16px] px-3 md:px-5 py-1 md:py-2"
                        >
                            {follow ? "Unfollow" : "Follow"}
                        </button>
                    )}
                    <div className="flex mt-5 self-center">
                        <Link
                            to={"followers"}
                            className="text-center self-center mx-5 md:mx-8"
                        >
                            <h2 className="font-semibold text-[22px] max-[490px]:text-[16px]">
                                {followers}
                            </h2>
                            <h3 className="text-gray font-medium max-[490px]:text-[14px] text-[18px]">
                                Followers
                            </h3>
                        </Link>
                        <Link
                            to={"followings"}
                            className="text-center self-center mx-5 md:mx-8"
                        >
                            <h2 className="font-semibold text-[22px] max-[490px]:text-[16px]">
                                {followings}
                            </h2>
                            <h3 className="text-gray font-medium max-[490px]:text-[14px] text-[18px]">
                                Followings
                            </h3>
                        </Link>
                    </div>
                </div>
            </div>
            {followMutation.isError && (
                <p className="text-red">
                    {followMutation.error.response.data.message
                        ? followMutation.error.response.data.message
                        : followMutation.error.message}
                </p>
            )}
            {unfollowMutation.isError && (
                <p className="text-red">
                    {unfollowMutation.error.response.data.message
                        ? unfollowMutation.error.response.data.message
                        : unfollowMutation.error.message}
                </p>
            )}
        </>
    );
}
