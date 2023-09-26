import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateAnswer } from "../../../hooks/useAnswer";
import { useEffect } from "react";

interface Inputs {
    answerText: string;
}
interface Props {
    id: number;
}

export default function ForumAddAnswer({ id }: Props) {
    const mutation = useCreateAnswer(id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                answerText: "",
            });
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mr-[10px] mt-[10px]"
            >
                <textarea
                    {...register("answerText", {
                        required: true,
                    })}
                    name="answerText"
                    className="text-[13px] border-2 outline-none border-gray rounded-lg p-1 sm:p-3 dark:text-white dark:bg-darkbg"
                    placeholder="Enter your answer here..."
                    aria-invalid={errors.answerText ? "true" : "false"}
                    required
                    autoFocus
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
    );
}
