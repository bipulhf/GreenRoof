import { SubmitHandler, useForm } from "react-hook-form";
import { useEditPost, useGetPost } from "../../../hooks/usePost";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommunityHeading from "../CommunityHeading";

interface Inputs {
    postText: string;
}

export default function CommunityEditPost() {
    const { postId } = useParams();
    const { data: post } = useGetPost(parseInt(postId || "0"));
    const postMutation = useEditPost(parseInt(postId || "0"));
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>({
        defaultValues: {
            postText: post?.postText,
        },
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => postMutation.mutate(data);
    useEffect(() => {
        if (post != null) {
            reset(post);
        }
        if (isSubmitSuccessful) {
            reset({
                postText: "",
            });
        }
    }, [isSubmitSuccessful, reset, post]);
    return (
        <>
            <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
                <CommunityHeading heading="Edit Post" />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col pt-[5%]"
                >
                    <textarea
                        {...register("postText")}
                        className="text-[16px] h-[45vh] w-[90%] border-2 border-graybg  resize-none focus:outline-none self-center"
                        name="postText"
                        id="postText"
                        placeholder="Share your photos, experiences..."
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        disabled={postMutation.isLoading}
                        className="mt-[2%] self-center h-fit border rounded-full bg-greenbtn text-white text-[16px] px-5 py-1"
                    >
                        {postMutation.isLoading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
        </>
    );
}
