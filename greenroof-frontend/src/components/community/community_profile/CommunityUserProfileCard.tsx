import { Link } from "react-router-dom";
import { Follower, Following } from "../../../services/types";
import user_photo from "/assets/forum/user_profile_photo_104x104.png";

interface Props {
    firstname: string;
    lastname: string;
    username: string;
    city: string;
    followers: Follower[];
    followings: Following[];
}

export default function CommunityUserProfileCard({
    firstname,
    lastname,
    username,
    city,
    followers,
    followings,
}: Props) {
    return (
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
            </div>
            <div className="flex max-sm:mt-5 justify-evenly">
                <Link
                    to={"followers"}
                    className="text-center self-center mx-5 md:mx-8"
                >
                    <h2 className="font-semibold text-[22px] max-[490px]:text-[16px]">
                        {followers.length}
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
                        {followings.length}
                    </h2>
                    <h3 className="text-gray font-medium max-[490px]:text-[14px] text-[18px]">
                        Followings
                    </h3>
                </Link>
            </div>
        </div>
    );
}
