import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommunityHeading from "../CommunityHeading";
import { useEditComment, useGetComment } from "../../../hooks/useComment";

interface Inputs {
    commentText: string;
}

export default function CommunityEditComment() {
    const { postId, commentId } = useParams();
    const { data: comment } = useGetComment(parseInt(commentId || "0"));
    const commentMutation = useEditComment(parseInt(commentId || "0"));
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>({
        defaultValues: {
            commentText: comment?.commentText,
        },
    });
    const onSubmit: SubmitHandler<Inputs> = (data) =>
        commentMutation.mutate(data);
    useEffect(() => {
        if (comment != null) {
            reset(comment);
        }
        if (isSubmitSuccessful) {
            reset({
                commentText: "",
            });
            navigate("/community/post/" + postId);
        }
    }, [isSubmitSuccessful, reset, comment]);
    return (
        <>
            <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
                <CommunityHeading heading="Edit Comment" />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col pt-[5%]"
                >
                    <textarea
                        {...register("commentText")}
                        className="text-[16px] h-[45vh] w-[90%] border-2 border-graybg  resize-none focus:outline-none self-center"
                        name="commentText"
                        id="commentText"
                        placeholder="Share your photos, experiences..."
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        disabled={commentMutation.isLoading}
                        className="mt-[2%] self-center h-fit border rounded-full bg-greenbtn text-white text-[16px] px-5 py-1"
                    >
                        {commentMutation.isLoading
                            ? "Commenting..."
                            : "Comment"}
                    </button>
                </form>
            </div>
        </>
    );
}
