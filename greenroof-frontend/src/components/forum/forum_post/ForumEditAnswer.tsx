import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { token } from "../../../services/jwt-token";
import { useEditAnswer, useGetAnswer } from "../../../hooks/useAnswer";

interface Inputs {
    answerText: string;
}

export default function ForumEditAnswer() {
    const { postId, answerId } = useParams();
    const navigate = useNavigate();
    const mutation = useEditAnswer(token, parseInt(answerId || "0"));
    const { data: preData } = useGetAnswer(token, parseInt(answerId || "0"));
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            answerText: preData?.answerText,
        },
    });
    useEffect(() => {
        if (preData != null) {
            reset(preData);
        }
    }, [preData]);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data);
        navigate("/forum/post/" + postId);
    };
    return preData != undefined ? (
        <>
            <h2 className="font-bold text-[14px] sm:text-[16px] md:text-[22px]">
                Edit your answer
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mr-[10px] m-[15px] sm:m-[25px] md:m-[30px]"
            >
                <textarea
                    {...register("answerText", {
                        required: true,
                        minLength: 10,
                    })}
                    name="answerText"
                    className="text-[13px] border-2 border-gray rounded-lg p-1 sm:p-3 h-[1px]"
                    placeholder="Enter your answer here..."
                    aria-invalid={errors.answerText ? "true" : "false"}
                    required
                    autoComplete="off"
                />
                {errors.answerText && (
                    <p className="font-medium text-red">
                        Answer Text must be greater than 10 characters.
                    </p>
                )}
                {mutation.isError && (
                    <p className="text-red">
                        {mutation.error.response.data.message
                            ? mutation.error.response.data.message
                            : mutation.error.message}
                    </p>
                )}
                <button
                    type="submit"
                    className="p-1 w-[120px] my-[15px] rounded-full bg-greenbtn text-white text-[13px] hover:bg-greenttl md:px-3 font-medium"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Posting..." : "Reply"}
                </button>
            </form>
        </>
    ) : (
        <p className="font-medium">Loading...</p>
    );
}
