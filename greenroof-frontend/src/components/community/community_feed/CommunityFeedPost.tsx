import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";
import ReadMore from "./ReadMore";
import { User } from "../../../services/types";
import CommunityPostLikeCmnt from "../community_post/CommunityPostLikeCmnt";
import { Link, useNavigate } from "react-router-dom";
import { useDeletePost, useEditPost } from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
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
    const { auth } = useAuth();
    const editMutation = useEditPost(postId);
    const deleteMutation = useDeletePost();
    const navigate = useNavigate();

    const onEdit = () => {
        navigate("/community/post/edit/" + postId);
    };
    const onDelete = () => {
        if (window.confirm("Do you really want to delete this post?"))
            deleteMutation.mutate(postId);
    };
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
                    {auth.username === user.username && (
                        <div className="flex text-gray">
                            <h3
                                className="mx-5 hover:cursor-pointer"
                                onClick={onEdit}
                            >
                                Edit
                            </h3>
                            <h3
                                className="hover:cursor-pointer"
                                onClick={onDelete}
                            >
                                Delete
                            </h3>
                        </div>
                    )}
                </div>
                <div className="pb-2 ">
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
                {deleteMutation.isError && (
                    <p className="text-red">
                        {deleteMutation.error.response.data.message
                            ? deleteMutation.error.response.data.message
                            : deleteMutation.error.message}
                    </p>
                )}
                {editMutation.isError && (
                    <p className="text-red">
                        {editMutation.error.response.data.message
                            ? editMutation.error.response.data.message
                            : editMutation.error.message}
                    </p>
                )}
            </div>
        </div>
    );
}
