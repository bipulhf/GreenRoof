import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { run } from "./AiAssistant";

interface Inputs {
    question: string;
}

export default function AiAssistantChat() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // run(data.question);
        console.log(data);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                question: "",
            });
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className="py-5 px-2 grid grid-cols-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-7 flex max-[500px]:ml-10"
            >
                <textarea
                    {...register("question")}
                    className="text-[16px] h-[80px] md:h-[105px] w-[90%] resize-none focus:outline-none"
                    name="question"
                    id="question"
                    placeholder="Ask your AI Assistant..."
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="relative self-center h-fit border rounded-full bg-greenbtn text-white text-[16px] px-5 py-1"
                >
                    Ask
                </button>
            </form>
        </div>
    );
}
