import { SubmitHandler, useForm } from "react-hook-form";
import useQuestion from "../../../hooks/useQuestion";
import { useParams } from "react-router-dom";
import useEditQ from "../../../hooks/useEditQ";

interface Inputs {
    questionTitle: string;
    questionText: string;
}

export default function ForumEditPost() {
    const { postId } = useParams();
    const { data: question } = useQuestion(parseInt(postId || "0"));

    const preData = {
        questionTitle: question?.questionTitle,
        questionText: question?.questionText,
    };

    const mutation = useEditQ(
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib3Nob250byIsImlhdCI6MTY5NDE5NjIyMCwiZXhwIjoxNjk0MjgyNjIwfQ.mvoAviO2oNwx7SqlbLW2AOB9jjC3f2IErTKo0vLlXRQ",
        parseInt(postId || "0")
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: preData,
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data);
    };
    return (
        <>
            <h2 className="font-bold text-[14px] sm:text-[16px] md:text-[22px]">
                Edit your question
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mr-[10px] m-[15px] sm:m-[25px] md:m-[30px]"
            >
                <input
                    {...register("questionTitle", {
                        required: true,
                        minLength: 10,
                    })}
                    type="text"
                    name="questionTitle"
                    className="text-[14px] sm:text-[17px] md:text-[22px] border-2 border-greenbtn rounded-lg p-1 sm:p-3"
                    placeholder="Enter your Question Title"
                    aria-invalid={errors.questionTitle ? "true" : "false"}
                    required
                    autoComplete="off"
                />
                {errors.questionTitle && (
                    <p className="font-medium text-red">
                        Question Title must be greater than 10 characters.
                    </p>
                )}
                <textarea
                    {...register("questionText", {
                        required: true,
                        minLength: 10,
                    })}
                    className="text-[12px] sm:text-[14px] md:text-[16px] w-full border-2 border-gray rounded-lg p-1 sm:p-3 h-[150px] mt-[15px]"
                    name="questionText"
                    placeholder="Type your question descriptively..."
                    aria-invalid={errors.questionText ? "true" : "false"}
                    required
                    autoComplete="off"
                />
                {errors.questionText && (
                    <p className="font-medium text-red">
                        Question Text must be greater than 10 characters.
                    </p>
                )}
                {mutation.isError && (
                    <p className="font-medium text-red">
                        Network Error. Please Try again.
                    </p>
                )}
                <button
                    type="submit"
                    className={
                        "p-1 w-[120px] sm:w-[200px] my-[15px] rounded-full text-white text-[12px] hover:bg-greenttl sm:text-[15px] md:text-[18px] md:px-3 text-medium " +
                        (mutation.isLoading ? "bg-gray" : "bg-greenbtn")
                    }
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Updating..." : "Edit your question"}
                </button>
            </form>
        </>
    );
}
