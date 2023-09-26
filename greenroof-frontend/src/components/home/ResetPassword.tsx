import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginIcon from "/assets/community/login.svg";
import roofTopImage from "/assets/community/roof-desktop.svg";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useSearchParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNewPassword } from "../../hooks/useLogin";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Popup from "reactjs-popup";
import PopupLoading from "../PopupLoading";
import PasswordResetSuccessful from "./PasswordResetSuccessful";

interface Inputs {
    newPassword: string;
}

export default function ResetPassword() {
    const { auth } = useAuth();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token")!;
    const mutation = useNewPassword(token);
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data);
    };

    useEffect(() => {
        if (isSubmitSuccessful && mutation.data) {
            setOpen(!open);
        }
    }, [isSubmitSuccessful, mutation.data]);

    return (
        <>
            {auth.username && auth.accessToken ? (
                <Navigate
                    to={"/community"}
                    state={{ from: location }}
                    replace
                />
            ) : (
                <>
                    <Popup
                        modal
                        open={open}
                        closeOnDocumentClick
                        onClose={() => setOpen(!open)}
                    >
                        <PasswordResetSuccessful />
                    </Popup>
                    {mutation.isLoading && (
                        <Popup
                            modal
                            open={mutation.isLoading}
                            closeOnDocumentClick
                        >
                            <PopupLoading />
                        </Popup>
                    )}
                    <div
                        className={`flex max-lg:flex-col justify-between max-lg:min-h-screen ${
                            mutation.isLoading || open
                                ? `bg-grabg opacity-10`
                                : ``
                        }`}
                    >
                        <div className="m-[10%] relative z-10">
                            <div className="flex mb-10 animate-fade-right animate-once animate-ease-in-out">
                                <img src={loginIcon} alt="Login" />
                                <h2 className="text-3xl min-[414px]:text-4xl font-semibold self-center relative z-10">
                                    Reset Your Password
                                </h2>
                            </div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="text-xl min-[414px]:text-2xl relative z-10"
                            >
                                <label
                                    htmlFor="username"
                                    className=" font-semibold p-5 animate-fade-right animate-once animate-delay-200 animate-ease-in-out"
                                >
                                    New Password:
                                </label>
                                <br />
                                <input
                                    {...register("newPassword", {
                                        required: true,
                                    })}
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="Enter your new password ..."
                                    autoFocus
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 mb-10 animate-fade-right animate-once animate-delay-200 animate-ease-in-out"
                                />{" "}
                                <br />
                                {mutation.isError && (
                                    <p className="text-red mx-5 mb-10">
                                        {mutation.error.response.data.message
                                            ? mutation.error.response.data
                                                  .message
                                            : mutation.error.message}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="ml-5 bg-brown px-5 py-3 rounded-full text-white font-medium text-xl min-[414px]:text-2xl hover:underline animate-fade-right animate-once animate-delay-[600ms] animate-ease-in-out"
                                >
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="mr-3"
                                    />
                                    Change Password
                                </button>
                            </form>
                        </div>
                        <img
                            src={roofTopImage}
                            alt="Roof Top Image"
                            className="max-sm:hidden w-[100%] md:w-[80%] self-center lg:w-[50%] max-md:absolute lg:absolute max-[720px]:-bottom-72 bottom-0 right-0"
                        />
                    </div>
                </>
            )}
        </>
    );
}
