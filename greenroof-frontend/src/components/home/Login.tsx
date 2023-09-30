import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginIcon from "/assets/community/login.svg";
import roofTopImage from "/assets/community/roof-desktop.svg";
import { faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateLogin } from "../../hooks/useLogin";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Popup from "reactjs-popup";
import PopupLoading from "../PopupLoading";

interface Inputs {
    username: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const mutation = useCreateLogin();
    const from = location.state?.from;

    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data);
    };

    useEffect(() => {
        if (isSubmitSuccessful && mutation.data && from) {
            navigate(from);
        }
    }, [isSubmitSuccessful, mutation.data, from]);

    useEffect(() => {
        if (
            from &&
            from.pathname !== "/logout" &&
            from.pathname !== "/community"
        ) {
            navigate(from);
        }
    }, [from]);

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
                                    Login to your profile
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
                                    Username:
                                </label>
                                <br />
                                <input
                                    {...register("username", {
                                        required: true,
                                    })}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter your username..."
                                    autoFocus
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 mb-10 animate-fade-right animate-once animate-delay-200 animate-ease-in-out"
                                />{" "}
                                <br />
                                <label
                                    htmlFor="password"
                                    className=" font-semibold p-5 animate-fade-right animate-once animate-delay-300 animate-ease-in-out"
                                >
                                    Password:
                                </label>
                                <br />
                                <input
                                    {...register("password", {
                                        required: true,
                                    })}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password..."
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 animate-fade-right animate-once animate-delay-300 animate-ease-in-out"
                                />{" "}
                                {mutation.isError && (
                                    <p className="text-red mx-5">
                                        {mutation.error.response.data.message
                                            ? mutation.error.response.data
                                                  .message
                                            : mutation.error.message}
                                    </p>
                                )}
                                <div className="flex max-[430px]:flex-col justify-between my-10">
                                    <button
                                        type="submit"
                                        disabled={mutation.isLoading}
                                        className="bg-blue px-5 py-3 rounded-full text-white font-medium text-xl min-[414px]:text-2xl max-[430px]:mb-5 hover:underline animate-fade-right animate-once animate-delay-500 animate-ease-in-out"
                                    >
                                        <FontAwesomeIcon
                                            icon={faRightToBracket}
                                            className="mr-3"
                                        />
                                        {mutation.isLoading
                                            ? "Entering..."
                                            : "Enter"}
                                    </button>
                                    <Link
                                        to={"/forgot-password"}
                                        className="bg-brown px-5 py-3 rounded-full text-white font-medium text-center text-xl min-[414px]:text-2xl hover:underline animate-fade-right animate-once animate-delay-[600ms] animate-ease-in-out"
                                    >
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="mr-3"
                                        />
                                        Forgot Password?
                                    </Link>
                                </div>
                            </form>
                            <h2 className="text-xl min-[414px]:text-2xl min-[590px]:text-3xl animate-fade-right animate-once animate-delay-700 animate-ease-in-out">
                                Don't have an account?{" "}
                                <Link
                                    to={"/register"}
                                    className="font-bold hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </h2>
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
