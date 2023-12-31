import { useNavigate } from "react-router-dom";
import { useDeleteComment } from "../../../hooks/useComment";
import { User } from "../../../services/Types";
import useAuth from "../../../hooks/useAuth";
import { useGetUser } from "../../../hooks/useProfile";

interface Props {
    id: number;
    postId: number;
    text: string;
    commenter: User;
    createdAt: Date;
}

export default function CommunityCommentmMarkup({
    id,
    postId,
    text,
    commenter,
    createdAt,
}: Props) {
    const { auth } = useAuth();
    const { data: loggedInUser } = useGetUser(auth.username);
    const deleteMutation = useDeleteComment();
    const navigate = useNavigate();
    const onEdit = () => {
        navigate("/community/comment/edit/" + postId + "/" + id);
    };
    const onDelete = () => {
        if (window.confirm("Do you really want to delete this post?"))
            deleteMutation.mutate(id);
    };

    return (
        <div className="py-5 px-2 grid grid-cols-10">
            <div className="profile-img">
                <img
                    src={commenter.profilePhoto}
                    alt="Profile Photo"
                    className="col-span-1 max-[350px]:col-span-2 ml-2 max-w-[40px] max-h-[40px] min-h-[40px] min-w-[40px] rounded-full"
                />
            </div>
            <div className="ml-5 max-[350px]:col-span-8 col-span-9">
                <div className="flex justify-between pb-1">
                    <div className="flex max-sm:flex-col">
                        <h2 className="font-semibold text-[15px] mr-2 dark:text-white">
                            {commenter.firstName + " " + commenter.lastName}
                        </h2>
                        <h2 className="font-medium text-[13px] text-gray sm:self-center dark:text-darksecondary">
                            @{commenter.username}
                        </h2>
                    </div>
                    <div className="flex text-gray dark:text-darksecondary">
                        {auth.username === commenter.username && (
                            <h3
                                className="mx-5 hover:cursor-pointer"
                                onClick={onEdit}
                            >
                                Edit
                            </h3>
                        )}
                        {(auth.username === commenter.username ||
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
                    <h3 className="text-[14px] text-justify dark:text-white">
                        {text}
                    </h3>
                </div>
                <div>
                    <h3 className="text-gray text-[13px] dark:text-darksecondary">
                        {new Date(createdAt).toLocaleString()}
                    </h3>
                </div>
                {deleteMutation.isError && (
                    <p className="text-red">
                        {deleteMutation.error.response.data.message
                            ? deleteMutation.error.response.data.message
                            : deleteMutation.error.message}
                    </p>
                )}
            </div>
        </div>
    );
}
