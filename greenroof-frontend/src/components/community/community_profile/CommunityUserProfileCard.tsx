import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    useFollows,
    useIsFollow,
    useUnfollow,
} from "../../../hooks/useFollowersFollowings";
import useAuth from "../../../hooks/useAuth";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uploadImages from "../../../services/ImageUpload";
import { useProfilePhoto } from "../../../hooks/useProfile";
import { User } from "../../../services/types";

interface Props {
    user: User;
    followers: number;
    followings: number;
}

export default function CommunityUserProfileCard({
    user,
    followers,
    followings,
}: Props) {
    const { auth } = useAuth();
    const { username: uname } = useParams();
    const [follow, setFollow] = useState(false);
    const { data: isFollow } = useIsFollow(uname || "");
    const mutation = useProfilePhoto();
    const followMutation = useFollows(uname || "");
    const unfollowMutation = useUnfollow(uname || "");
    const [image, setImage] = useState<File>();
    const [profilePhotoLink, setProfilePhotoLink] = useState(user.profilePhoto);

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

    const imageOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (image) {
            const imagePromise = async () => await uploadImages(image);
            imagePromise().then((d) => {
                mutation.mutate(d);
                setProfilePhotoLink(d);
            });
        }
    }, [image, mutation]);

    return (
        <>
            <div className="justify-center py-7 dark:text-white">
                <div className="flex flex-col text-center">
                    <div className="relative first-letter:ml-5 profile-img max-[490px]:w-[100px] max-[490px]:h-[100px] w-[150px] h-[150px] self-center">
                        <img
                            src={profilePhotoLink}
                            alt="User Photo"
                            className="max-[490px]:w-[100px] max-[490px]:h-[100px] w-[150px] h-[150px] rounded-full"
                        />
                        <form>
                            <label>
                                <FontAwesomeIcon
                                    icon={faCameraRetro}
                                    fontSize={22}
                                    className="text-white bg-black p-3 rounded-full absolute opacity-40 hover:opacity-100 right-5 bottom-2 hover:cursor-pointer"
                                    type="submit"
                                />
                                <input
                                    type="file"
                                    name="img"
                                    id="img"
                                    onChange={imageOnChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </form>
                    </div>
                    <div className="ml-5 self-center">
                        <h2 className="font-semibold text-[22px] max-[490px]:text-[18px] ">
                            {user.firstName + " " + user.lastName}
                        </h2>
                        <h3 className="text-gray font-medium max-[490px]:text-[15px] text-[18px] dark:text-darksecondary">
                            @{user.username}
                        </h3>
                        <h3 className="text-[16px] max-[490px]:text-[14px] ">
                            From {user.city}
                        </h3>
                    </div>
                    {auth.username != uname && (
                        <button
                            onClick={onFollow}
                            className="self-center h-fit rounded-full bg-greenbtn text-white text-[13px] md:text-[16px] px-3 py-1 md:py-2 my-2"
                        >
                            {follow ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>
                <div className="flex flex-col max-sm:mt-5 justify-center">
                    <div className="flex mt-5 self-center">
                        <Link
                            to={"followers"}
                            className="text-center self-center mx-5 md:mx-8"
                        >
                            <h2 className="font-semibold text-[22px] max-[490px]:text-[16px]">
                                {followers}
                            </h2>
                            <h3 className="text-gray font-medium max-[490px]:text-[14px] text-[18px] dark:text-darksecondary">
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
                            <h3 className="text-gray font-medium max-[490px]:text-[14px] text-[18px] dark:text-darksecondary">
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
