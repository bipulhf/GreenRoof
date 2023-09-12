import { Link, useParams } from "react-router-dom";
import { token } from "../../../services/jwt-token";
import user_photo from "/assets/forum/forum_question_user_photo_30x30.png";
import useNumberOfAnswer from "../../../hooks/useNumberOfAnswer";
import { useDeleteQuestion } from "../../../hooks/useQuestion";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
    id: number;
}

export default function ForumQuestionerInfo({
    firstName,
    lastName,
    username,
    id,
}: Props) {
    const mutation = useDeleteQuestion(token);
    const deletePost = (id: number) => {
        if (window.confirm("Do you really want to delete the post?"))
            mutation.mutate(id);
    };
    const { data: noOfAns } = useNumberOfAnswer(id);
    const { postId } = useParams();
    return (
        <>
            <div className="self-center col-span-4 sm:col-span-3 md:col-span-2 text-center mr-4">
                <div className="questioner flex text-left mb-3">
                    <img
                        src={user_photo}
                        alt="User Photo"
                        className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] rounded-full mr-[5px] mt-[5px]"
                    />
                    {postId == null ? (
                        <Link
                            to={"/forum/user/" + username}
                            className="username"
                        >
                            <h3 className="font-semibold text-[11px] sm:text-[13px] md:text-[16px]">
                                {firstName + " " + lastName}
                            </h3>
                            <h4 className="font-medium text-[9px] sm:text-[11px] md:text-[13px] text-gray">
                                @{username}
                            </h4>
                        </Link>
                    ) : (
                        <div>
                            <h3 className="font-semibold text-[11px] sm:text-[13px] md:text-[16px]">
                                {firstName + " " + lastName}
                            </h3>
                            <h4 className="font-medium text-[9px] sm:text-[11px] md:text-[13px] text-gray">
                                @{username}
                            </h4>
                        </div>
                    )}
                </div>
                <div className="answers-no mt-[25px]">
                    <h3 className="font-semibold text-gray text-[10px] sm:text-[12px]">
                        {noOfAns?.noa} Answers
                    </h3>
                    {postId != null && (
                        <div className="flex justify-evenly">
                            <Link
                                to={"/forum/post/edit/" + id}
                                className="text-gray font-medium text-[12px]"
                            >
                                Edit
                            </Link>

                            <button
                                className="text-gray font-medium text-[12px]"
                                onClick={() => deletePost(parseInt(postId))}
                            >
                                Delete
                            </button>
                        </div>
                    )}
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
