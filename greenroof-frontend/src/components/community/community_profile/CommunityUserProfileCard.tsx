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
import {
    useBanUser,
    useGetUser,
    useProfileName,
    useProfilePhoto,
} from "../../../hooks/useProfile";
import { SubmitHandler, useForm } from "react-hook-form";
import updateSendBirdProfile from "../../../services/UpdateSendBirdProfileURL";
import CreateChannel from "../../../services/CreateChannel";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
    profilePhoto: string;
    isUserBanned: boolean;
    city: string;
    followers: number;
    followings: number;
}

interface Inputs {
    firstName: string;
    lastName: string;
}

export default function CommunityUserProfileCard({
    firstName,
    lastName,
    username,
    profilePhoto,
    isUserBanned,
    city,
    followers,
    followings,
}: Props) {
    const { auth } = useAuth();
    const { data: loggedInUser } = useGetUser(auth.username);
    const { username: uname } = useParams();
    const [follow, setFollow] = useState(false);
    const { data: isFollow } = useIsFollow(uname || "");
    const mutation = useProfilePhoto();
    const followMutation = useFollows(uname || "");
    const unfollowMutation = useUnfollow(uname || "");
    const [profilePhotoLink, setProfilePhotoLink] = useState(profilePhoto);
    const userProfileMutation = useProfileName();
    const [fullName, setFullName] = useState(firstName + " " + lastName);
    const banMutation = useBanUser();

    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>({
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
        },
    });

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
            const imagePromise = async () =>
                await uploadImages(event.target.files![0]);
            imagePromise().then((imgUrl) => {
                mutation.mutate(imgUrl);
                setProfilePhotoLink(imgUrl);
                updateSendBirdProfile(imgUrl, username);
            });
        }
    };

    const [cngName, setCngName] = useState(false);
    const [isBanned, setIsBanned] = useState(isUserBanned);
    const [channelLink, setChannelLink] = useState("");

    const changeName: SubmitHandler<Inputs> = (data) => {
        if (isSubmitSuccessful) {
            setCngName(!cngName);
            setFullName(data.firstName + " " + data.lastName);
        }
        userProfileMutation.mutate(data);
    };

    useEffect(() => {
        setIsBanned(isUserBanned);
        setFullName(firstName + " " + lastName);
        setProfilePhotoLink(profilePhoto);
    }, [isUserBanned, firstName, lastName, profilePhoto]);

    const banUser = () => {
        setIsBanned(!isBanned);
        banMutation.mutate(username);
    };

    const messageMe = () => {
        if (uname) {
            CreateChannel(auth.username, uname).then((result) => {
                setChannelLink(result);
            });
        }
    };

    useEffect(() => {
        messageMe();
    }, [channelLink]);

    return (
        <>
            <div className="relative justify-center py-7 dark:text-white">
                <div className="flex flex-col text-center">
                    <div className="flex justify-end">
                        {auth.username === uname && (
                            <button
                                onClick={() => setCngName(!cngName)}
                                className="text-right rounded-lg dark:text-white text-darkbg p-1 hover:underline mr-5"
                            >
                                Edit
                            </button>
                        )}
                        {loggedInUser?.role === "ADMIN" && (
                            <button
                                onClick={banUser}
                                className="text-right rounded-lg dark:text-white text-darkbg p-1"
                            >
                                {isBanned ? "Unban User" : "Ban User"}
                            </button>
                        )}
                    </div>
                    <div className="relative first-letter:ml-5 profile-img max-[490px]:w-[100px] max-[490px]:h-[100px] w-[150px] h-[150px] self-center">
                        <img
                            src={profilePhotoLink}
                            alt="User Photo"
                            className="max-[490px]:w-[100px] max-[490px]:h-[100px] w-[150px] h-[150px] rounded-full"
                        />
                        {auth.username === uname && (
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
                        )}
                    </div>
                    <div className="ml-5 self-center">
                        {cngName ? (
                            <form
                                onSubmit={handleSubmit(changeName)}
                                className="mt-3 font-semibold text-[22px] max-[490px]:text-[18px]"
                            >
                                <input
                                    {...register("firstName", {
                                        required: true,
                                    })}
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name"
                                    className="border mr-3 w-[20%]"
                                />
                                <input
                                    {...register("lastName", {
                                        required: true,
                                    })}
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name"
                                    className="border mr-3 w-[20%]"
                                />
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <h2 className="font-semibold text-[22px] max-[490px]:text-[18px]">
                                {fullName}
                            </h2>
                        )}
                        <h3 className="text-gray font-medium max-[490px]:text-[15px] text-[18px] dark:text-darksecondary">
                            @{username}
                        </h3>
                        <h3 className="text-[16px] max-[490px]:text-[14px] ">
                            From {city}
                        </h3>
                    </div>
                    {auth.username != uname && !isUserBanned && (
                        <div className="flex justify-center">
                            <button
                                onClick={onFollow}
                                className="self-center h-fit rounded-full bg-greenbtn text-white text-[13px] md:text-[16px] px-3 py-1 md:py-2 my-2 hover:underline"
                            >
                                {follow ? "Unfollow" : "Follow"}
                            </button>
                            <button className="ml-10 self-center h-fit rounded-full bg-brown text-white text-[13px] md:text-[16px] px-3 py-1 md:py-2 my-2 hover:underline">
                                <Link to={"/community/message/" + channelLink}>
                                    Message
                                </Link>
                            </button>
                        </div>
                    )}
                    {isUserBanned && (
                        <h2 className="self-center my-3 dark:text-white text-[13px] md:text-[16px]">
                            User has been banned from the site.
                        </h2>
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
