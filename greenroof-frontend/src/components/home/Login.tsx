import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginIcon from "/assets/community/login.svg";
import roofTopImage from "/assets/community/roof-desktop.svg";
import { faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateLogin } from "../../hooks/useLogin";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

interface Inputs {
    username: string;
    password: string;
}

export default function Login() {
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
            {auth.name && auth.accessToken ? (
                <Navigate
                    to={"/community"}
                    state={{ from: location }}
                    replace
                />
            ) : (
                <div className="flex max-lg:flex-col justify-between max-lg:min-h-screen">
                    <div className="m-[10%]">
                        <div className="flex mb-10">
                            <img src={loginIcon} alt="Login" />
                            <h2 className="text-3xl min-[414px]:text-4xl font-semibold self-center">
                                Login to your profile
                            </h2>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="text-xl min-[414px]:text-2xl"
                        >
                            <label
                                htmlFor="username"
                                className=" font-semibold p-5"
                            >
                                Username:
                            </label>
                            <br />
                            <input
                                {...register("username", { required: true })}
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username..."
                                autoFocus
                                className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 mb-10"
                            />{" "}
                            <br />
                            <label
                                htmlFor="password"
                                className=" font-semibold p-5"
                            >
                                Password:
                            </label>
                            <br />
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password..."
                                className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3"
                            />{" "}
                            {mutation.isError && (
                                <p className="text-red mx-5">
                                    {mutation.error.response.data.message
                                        ? mutation.error.response.data.message
                                        : mutation.error.message}
                                </p>
                            )}
                            <div className="flex max-sm:flex-col justify-between my-10">
                                <button
                                    type="submit"
                                    disabled={mutation.isLoading}
                                    className="bg-blue px-5 py-3 rounded-full text-white font-medium text-xl min-[414px]:text-2xl max-sm:mb-5 hover:underline"
                                >
                                    <FontAwesomeIcon
                                        icon={faRightToBracket}
                                        className="mr-3"
                                    />
                                    {mutation.isLoading
                                        ? "Entering..."
                                        : "Login"}
                                </button>
                                <button className="bg-brown px-5 py-3 rounded-full text-white font-medium text-xl min-[414px]:text-2xl hover:underline">
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="mr-3"
                                    />
                                    Forgot Password?
                                </button>
                            </div>
                        </form>
                        <h2 className="text-xl min-[414px]:text-2xl min-[590px]:text-3xl">
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
            )}
        </>
    );
}
