import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateComment } from "../../../hooks/useComment";
import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";

interface Props {
    postId: number;
}
interface Inputs {
    commentText: string;
}

export default function CommunityCreateComment({ postId }: Props) {
    const mutation = useCreateComment(postId);
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
            <div className="py-5 px-2 grid grid-cols-10">
                <img
                    src={user_profile_photo}
                    alt="Profile Photo"
                    className="col-span-1 ml-5 h-[25px] w-[25px]"
                />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="col-span-9 flex ml-8"
                >
                    <textarea
                        {...register("commentText", {
                            required: true,
                            minLength: 1,
                        })}
                        className="text-[14px] h-[60px] w-[90%] resize-none focus:outline-none"
                        name="commentText"
                        id="commentText"
                        placeholder="Type your thoughts about the post ..."
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="self-end h-fit border rounded-full bg-greenbtn text-white text-[14px] px-3 py-1"
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
