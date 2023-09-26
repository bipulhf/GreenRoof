import { Link } from "react-router-dom";
import { useDeleteAnswer } from "../../../hooks/useAnswer";
import useAuth from "../../../hooks/useAuth";

interface Props {
    postId: number;
    answerId: number;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    username: string;
}

export default function ForumAnswererInfo({
    postId,
    answerId,
    firstName,
    lastName,
    username,
    profilePhoto,
}: Props) {
    const { auth } = useAuth();
    const mutation = useDeleteAnswer();
    const deleteAnswer = (id: number) => {
        if (window.confirm("Do you really want to delete the answer?"))
            mutation.mutate(id);
    };
    return (
        <>
            <div className="self-center col-span-4 sm:col-span-3 md:col-span-2 text-center mr-4">
                <div className="flex text-left mb-3 break-all">
                    <img
                        src={profilePhoto}
                        alt="User Photo"
                        className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] rounded-full mr-[5px] mt-[5px]"
                    />
                    <Link to={"/forum/user/" + username} className="username">
                        <h3 className="font-semibold text-[11px] sm:text-[13px] md:text-[16px] dark:text-white">
                            {firstName + " " + lastName}
                        </h3>
                        <h4 className="font-medium text-[9px] sm:text-[11px] md:text-[13px] text-gray dark:text-darksecondary">
                            @{username}
                        </h4>
                    </Link>
                </div>
                {auth.username === username && (
                    <div className="flex justify-evenly">
                        <Link
                            to={"/forum/answer/edit/" + postId + "/" + answerId}
                            className="text-gray font-medium text-[12px] dark:text-darksecondary"
                        >
                            Edit
                        </Link>

                        <button
                            className="text-gray font-medium text-[12px] dark:text-darksecondary"
                            onClick={() => deleteAnswer(answerId)}
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
        </>
    );
}
