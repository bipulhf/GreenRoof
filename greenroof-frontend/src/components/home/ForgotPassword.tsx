import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginIcon from "/assets/community/login.svg";
import roofTopImage from "/assets/community/roof-desktop.svg";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateLogin } from "../../hooks/useLogin";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Popup from "reactjs-popup";
import PopupLoading from "../PopupLoading";

interface Inputs {
    email: string;
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const mutation = useCreateLogin();
    const from = location.state?.from?.pathname || "/community";

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
            navigate(from, { replace: true });
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
                            mutation.isLoading ? `bg-grabg opacity-10` : ``
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
                                    Email:
                                </label>
                                <br />
                                <input
                                    {...register("email", {
                                        required: true,
                                    })}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your Email..."
                                    autoFocus
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 mb-10 animate-fade-right animate-once animate-delay-200 animate-ease-in-out"
                                />{" "}
                                <br />
                                {mutation.isError && (
                                    <p className="text-red mx-5">
                                        {mutation.error.response.data.message
                                            ? mutation.error.response.data
                                                  .message
                                            : mutation.error.message}
                                    </p>
                                )}
                                <Link
                                    to={"/forgot-password"}
                                    className="ml-5 bg-brown px-5 py-3 rounded-full text-white font-medium text-xl min-[414px]:text-2xl hover:underline animate-fade-right animate-once animate-delay-[600ms] animate-ease-in-out"
                                >
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="mr-3"
                                    />
                                    Send Verification Mail
                                </Link>
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
