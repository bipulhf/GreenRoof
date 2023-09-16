import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";
import ReadMore from "./ReadMore";
import { User } from "../../../services/types";
import CommunityPostLikeCmnt from "../community_post/CommunityPostLikeCmnt";
import { Link } from "react-router-dom";

interface Props {
    postId: number;
    postText: string;
    user: User;
    createdAt: Date;
    fullPost: boolean;
}

export default function CommunityFeedPost({
    postId,
    fullPost,
    postText,
    user,
    createdAt,
}: Props) {
    return (
        <div className="py-5 px-3 grid grid-cols-10">
            <img
                src={user_profile_photo}
                alt="Profile Photo"
                className="col-span-1 max-[350px]:col-span-2 ml-2 min-w-[40px] min-h-[40px]"
            />
            <div className="ml-5 max-[350px]:col-span-8 col-span-9">
                <div className="flex justify-between pb-1">
                    <Link
                        to={"user/" + user.username}
                        className="flex max-sm:flex-col"
                    >
                        <h2 className="font-semibold text-[15px] sm:mr-2">
                            {user.firstName + " " + user.lastName}
                        </h2>
                        <h2 className="font-medium text-[13px] text-gray sm:self-center">
                            @{user.username}
                        </h2>
                    </Link>
                    <div className="flex text-gray">
                        <h3 className="mx-5">Edit</h3>
                        <h3>Delete</h3>
                    </div>
                </div>
                <div className="pb-2">
                    <h3 className="text-[14px] text-justify">
                        {fullPost ? postText : <ReadMore>{postText}</ReadMore>}
                    </h3>
                </div>
                <div>
                    <h3 className="text-gray text-[13px]">
                        {new Date(createdAt).toLocaleString()}
                    </h3>
                </div>
                <CommunityPostLikeCmnt postId={postId} />
            </div>
        </div>
    );
}
