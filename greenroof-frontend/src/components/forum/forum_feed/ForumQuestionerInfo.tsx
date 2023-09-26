import { Link, useParams } from "react-router-dom";
import useNumberOfAnswer from "../../../hooks/useNumberOfAnswer";
import { useDeleteQuestion } from "../../../hooks/useQuestion";
import useAuth from "../../../hooks/useAuth";
import { useGetUser } from "../../../hooks/useProfile";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
    profilePhoto: string;
    id: number;
}

export default function ForumQuestionerInfo({
    firstName,
    lastName,
    profilePhoto,
    username,
    id,
}: Props) {
    const { auth } = useAuth();
    const { data: loggedInUser } = useGetUser(auth.username);
    const mutation = useDeleteQuestion();
    const deletePost = (id: number) => {
        if (window.confirm("Do you really want to delete the post?"))
            mutation.mutate(id);
    };
    const { data: noOfAns } = useNumberOfAnswer(id);
    const { postId } = useParams();
    return (
        <>
            <div className="self-center col-span-4 sm:col-span-3 md:col-span-2 text-center mr-4 break-all">
                <div className="questioner flex text-left mb-3">
                    <img
                        src={profilePhoto}
                        alt="User Photo"
                        className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] rounded-full mr-5 mt-[5px]"
                    />
                    {postId == null ? (
                        <Link
                            to={"/forum/user/" + username}
                            className="username"
                        >
                            <h3 className="font-semibold text-[11px] sm:text-[13px] md:text-[16px] dark:text-white">
                                {firstName + " " + lastName}
                            </h3>
                            <h4 className="font-medium text-[9px] sm:text-[11px] md:text-[13px] text-gray dark:text-darksecondary">
                                @{username}
                            </h4>
                        </Link>
                    ) : (
                        <div>
                            <h3 className="font-semibold text-[11px] sm:text-[13px] md:text-[16px] dark:text-white">
                                {firstName + " " + lastName}
                            </h3>
                            <h4 className="font-medium text-[9px] sm:text-[11px] md:text-[13px] text-gray dark:text-darksecondary">
                                @{username}
                            </h4>
                        </div>
                    )}
                </div>
                <div className="answers-no mt-[25px]">
                    <h3 className="font-semibold text-gray text-[10px] sm:text-[12px] dark:text-darksecondary">
                        {noOfAns?.noa} Answers
                    </h3>
                    <div className="flex justify-evenly">
                        {postId != null && auth.username === username && (
                            <Link
                                to={"/forum/post/edit/" + id}
                                className="text-gray font-medium text-[12px] dark:text-darksecondary"
                            >
                                Edit
                            </Link>
                        )}
                        {postId != null &&
                            (auth.username === username ||
                                loggedInUser?.role === "ADMIN") && (
                                <button
                                    className="text-gray font-medium text-[12px] dark:text-darksecondary"
                                    onClick={() => deletePost(parseInt(postId))}
                                >
                                    Delete
                                </button>
                            )}
                    </div>
                    {mutation.isError && (
                        <p className="text-red">
                            {mutation.error.response.data.message
                                ? mutation.error.response.data.message
                                : mutation.error.message}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
