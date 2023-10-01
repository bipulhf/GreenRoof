import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateComment } from "../../../hooks/useComment";
import { useGetUser } from "../../../hooks/useProfile";
import useAuth from "../../../hooks/useAuth";

interface Props {
    postId: number;
}
interface Inputs {
    commentText: string;
}

export default function CommunityCreateComment({ postId }: Props) {
    const { auth } = useAuth();
    const mutation = useCreateComment(postId);
    const { data: loggedInUser } = useGetUser(auth.username);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => mutation.mutate(data);
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                commentText: "",
            });
        }
    }, [isSubmitSuccessful, reset]);
    return (
        <>
            <div className="py-5 px-2 grid grid-cols-10 dark:bg-darkbg">
                <div className="profile-img">
                    <img
                        src={loggedInUser?.profilePhoto}
                        alt="Profile Photo"
                        className="col-span-1 ml-5 max-h-[25px] max-w-[25px] min-h-[25px] min-w-[25px] rounded-full"
                    />
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="col-span-9 flex ml-8"
                >
                    <textarea
                        {...register("commentText", {
                            required: true,
                            minLength: 1,
                        })}
                        className="text-[14px] h-[60px] w-[90%] resize-none focus:outline-none dark:bg-darkbg dark:text-white"
                        name="commentText"
                        id="commentText"
                        placeholder="Type your thoughts about the post ..."
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="self-end h-fit rounded-full bg-greenbtn text-white text-[14px] px-3 py-1"
                    >
                        {mutation.isLoading ? "Commenting..." : "Comment"}
                    </button>
                </form>
            </div>
            {mutation.isError && (
                <p className="text-red">
                    {mutation.error.response.data.message
                        ? mutation.error.response.data.message
                        : mutation.error.message}
                </p>
            )}
        </>
    );
}
