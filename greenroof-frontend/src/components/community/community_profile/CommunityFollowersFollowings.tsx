import { Link, useParams } from "react-router-dom";
import {
    useFollowers,
    useFollowings,
} from "../../../hooks/useFollowersFollowings";
import CommunityHeading from "../CommunityHeading";

export default function CommunityFollowersFollowings() {
    const { username } = useParams();
    const { data: followers } = useFollowers(username || "");
    const { data: followings } = useFollowings(username || "");
    const isFollowers =
        window.location.href.indexOf("followers") > -1 ? true : false;
    return isFollowers ? (
        <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg dark:divide-opacity-25">
            <CommunityHeading heading="Followers" />
            {followers?.map((follower) => (
                <div className="flex px-[5%] min-[1200px]:px-[10%] py-[3%] self-center">
                    <img
                        src={follower.follower.profilePhoto}
                        alt="User Photo"
                        className="h-[40px] w-[40px] mr-5 rounded-full"
                    />
                    <Link
                        to={"/community/user/" + follower.follower.username}
                        className="mr-7"
                    >
                        <h2 className="font-medium text-[16px] dark:text-white">
                            {follower.follower.firstName}{" "}
                            {follower.follower.lastName}
                        </h2>
                        <h3 className="text-gray text-[14px] dark:text-darksecondary">
                            @{follower.follower.username}
                        </h3>
                    </Link>
                </div>
            ))}
        </div>
    ) : (
        <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Followings" />
            {followings?.map((following) => (
                <div className="flex px-[5%] min-[1200px]:px-[10%] py-[3%] self-center">
                    <img
                        src={following.following.profilePhoto}
                        alt="User Photo"
                        className="h-[40px] w-[40px] mr-5 rounded-full"
                    />
                    <Link
                        to={"/community/user/" + following.following.username}
                        className="mr-7"
                    >
                        <h2 className="font-medium text-[16px] dark:text-white">
                            {following.following.firstName}{" "}
                            {following.following.lastName}
                        </h2>
                        <h3 className="text-gray text-[14px] dark:text-darksecondary">
                            @{following.following.username}
                        </h3>
                    </Link>
                </div>
            ))}
        </div>
    );
}
