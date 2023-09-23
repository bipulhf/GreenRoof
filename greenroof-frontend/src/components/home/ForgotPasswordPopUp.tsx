import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
    token: string;
}

export default function ForgotPasswordPopUp() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        //mutation.mutate(data);
    };

    return (
        <div className="modal text-center divide-y divide-graybg bg-white border-2 border-blue font-semibold pb-5">
            <div className="flex p-5">
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    fontSize={24}
                    className="text-greenttl"
                />
                <h1 className="pl-3 text-3xl">
                    A Verification Mail has been sent to your email account
                </h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-xl min-[414px]:text-xl relative z-10"
            >
                <div className="flex justify-center">
                    <h2 className="text-xl p-5">
                        Please insert the given code :
                    </h2>
                    <input
                        {...register("token", {
                            required: true,
                        })}
                        type="token"
                        name="token"
                        id="token"
                        placeholder="Enter your token..."
                        autoFocus
                        className="px-6 py-2 border-2 rounded-full mx-5 mt-3 mb-10 animate-fade-right"
                    />{" "}
                </div>
                <button
                    type="submit"
                    className="text-xl text-white bg-greenttl px-4 py-2 rounded-full hover:underline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
