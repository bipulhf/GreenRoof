import ReadMore from "./ReadMore";
import { Attatchments, User } from "../../../services/Types";
import CommunityPostLikeCmnt from "../community_post/CommunityPostLikeCmnt";
import { Link, useNavigate } from "react-router-dom";
import { useDeletePost, useEditPost } from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useGetUser } from "../../../hooks/useProfile";
interface Props {
    postId: number;
    postText: string;
    postAttatchments: Attatchments[];
    user: User;
    createdAt: Date;
    fullPost: boolean;
}

export default function CommunityFeedPost({
    postId,
    fullPost,
    postText,
    postAttatchments,
    user,
    createdAt,
}: Props) {
    const { auth } = useAuth();
    const { data: loggedInUser } = useGetUser(auth.username);
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
        <>
            <div className="py-5 px-3 grid grid-cols-10">
                <div className="profile-img">
                    <img
                        src={user.profilePhoto}
                        alt="Profile Photo"
                        className="col-span-1 max-[350px]:col-span-2 ml-2 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] rounded-full"
                    />
                </div>
                <div className="dark:text-white ml-5 max-[350px]:col-span-8 col-span-9">
                    <div className="flex justify-between pb-1">
                        <Link
                            to={"/community/user/" + user.username}
                            className="flex max-sm:flex-col"
                        >
                            <h2 className="font-semibold text-[15px] sm:mr-2">
                                {user.firstName + " " + user.lastName}
                            </h2>
                            <h2 className="font-medium text-[13px] text-gray dark:text-darksecondary sm:self-center">
                                @{user.username}
                            </h2>
                        </Link>
                        <div className="flex text-gray dark:text-darksecondary ">
                            {auth.username === user.username && (
                                <h3
                                    className="mx-5 hover:cursor-pointer"
                                    onClick={onEdit}
                                >
                                    Edit
                                </h3>
                            )}
                            {(auth.username === user.username ||
                                loggedInUser?.role === "ADMIN") && (
                                <h3
                                    className="hover:cursor-pointer"
                                    onClick={onDelete}
                                >
                                    Delete
                                </h3>
                            )}
                        </div>
                    </div>
                    <div className="pb-2">
                        <h3 className="text-[14px] text-justify">
                            {fullPost ? (
                                postText
                            ) : (
                                <ReadMore>{postText}</ReadMore>
                            )}
                        </h3>
                        {postAttatchments.length > 0 && (
                            <div className="slider-wrapper mt-3 mb-2">
                                <Swiper
                                    navigation={true}
                                    modules={[Navigation]}
                                    className="slider"
                                >
                                    {postAttatchments
                                        .sort()
                                        .map((postAttatchment) => (
                                            <SwiperSlide
                                                key={postAttatchment.id}
                                            >
                                                <img
                                                    id={postAttatchment.id.toString()}
                                                    src={
                                                        postAttatchment.link ||
                                                        ""
                                                    }
                                                    alt="Photo"
                                                    loading="lazy"
                                                />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-gray text-[13px] dark:text-darksecondary">
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
        </>
    );
}
