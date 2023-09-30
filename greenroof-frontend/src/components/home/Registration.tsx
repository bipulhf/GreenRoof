import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import roofTopImage from "/assets/community/roof-desktop.svg";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegistration } from "../../hooks/useLogin";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { districts } from "../../services/districts";
import EmailVerification from "./EmailVerification";
import Popup from "reactjs-popup";
import PopupLoading from "../PopupLoading";
import axios from "axios";

interface Inputs {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    city: string;
    password: string;
}

export default function Registration() {
    const location = useLocation();
    const { auth } = useAuth();
    const mutation = useRegistration();
    const [open, setOpen] = useState(false);
    const sendBirdData = {
        user_id: "",
        nickname: "",
        profile_url: "",
    };

    const sendBirdURL =
        "https://api-83DED529-E0E7-4BBB-AEB0-E78D67B2E2D0.sendbird.com/v3/users";
    const apiToken = "ebf287851ccc7acd28616cb625e2c288ce56e9ed";
    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        sendBirdData.nickname = data.firstname;
        sendBirdData.user_id = data.username;
        createSendBirdUser(sendBirdURL, sendBirdData, apiToken);
        mutation.mutate(data);
    };

    useEffect(() => {
        if (isSubmitSuccessful && mutation.data && sendBirdData) {
            setOpen(!open);
        }
    }, [isSubmitSuccessful, mutation.data]);

    const createSendBirdUser = (url: string, data: object, token: string) => {
        axios
            .post(url, data, {
                headers: {
                    "Api-Token": token,
                },
            })
            .then((response) => response)
            .catch((error) => {
                console.error(error);
            });
    };

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
                        <EmailVerification />
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
                            open || mutation.isLoading
                                ? `bg-grabg opacity-10`
                                : ``
                        }`}
                    >
                        <div className="mx-[5%] my-[2%] relative z-10">
                            <div className="flex mb-10">
                                <h2 className="text-3xl min-[414px]:text-4xl font-semibold self-center animate-fade-right animate-once animate-ease-in-out">
                                    Join Our Beautiful Community
                                </h2>
                            </div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="text-xl min-[414px]:text-2xl"
                                autoComplete="off"
                            >
                                <label
                                    htmlFor="firstname"
                                    className="font-semibold p-5 animate-fade-up animate-once animate-delay-300 animate-ease-in-out"
                                >
                                    First Name:
                                </label>
                                <br />
                                <input
                                    {...register("firstname", {
                                        required: true,
                                    })}
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="Enter your firstname..."
                                    autoFocus
                                    autoComplete="off"
                                    required
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 mb-10 animate-fade-up animate-once animate-delay-100 animate-ease-in-out"
                                />{" "}
                                <br />
                                <label
                                    htmlFor="lastname"
                                    className="font-semibold p-5 animate-fade-up animate-once animate-delay-300 animate-ease-in-out"
                                >
                                    Last Name:
                                </label>
                                <br />
                                <input
                                    {...register("lastname", {
                                        required: true,
                                    })}
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    autoComplete="off"
                                    required
                                    placeholder="Enter your lastname..."
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 mb-10 animate-fade-up animate-once animate-delay-100 animate-ease-in-out"
                                />{" "}
                                <br />
                                <label
                                    htmlFor="email"
                                    className="font-semibold p-5 animate-fade-up animate-once animate-delay-300 animate-ease-in-out"
                                >
                                    Email:
                                </label>
                                <br />
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="Enter your email..."
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 mb-10 animate-fade-up animate-once animate-delay-100 animate-ease-in-out"
                                />{" "}
                                <br />
                                <label
                                    htmlFor="username"
                                    className="font-semibold p-5 animate-fade-up animate-once animate-delay-300 animate-ease-in-out"
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
                                    autoComplete="off"
                                    required
                                    placeholder="Enter your username..."
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 mb-10 animate-fade-up animate-once animate-delay-100 animate-ease-in-out"
                                />{" "}
                                <br />
                                <label
                                    htmlFor="password"
                                    className="font-semibold p-5 animate-fade-up animate-once animate-delay-300 animate-ease-in-out"
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
                                    autoComplete="off"
                                    required
                                    placeholder="Enter your password..."
                                    className="px-6 py-2 rounded-full w-[100%] mx-5 mt-3 animate-fade-up animate-once animate-delay-100 animate-ease-in-out"
                                />{" "}
                                <br />
                                <div className="font-semibold px-5 pt-5 animate-fade-up animate-once animate-delay-300 animate-ease-in-out">
                                    <label htmlFor="city" className="pr-5">
                                        Select District:
                                    </label>
                                    <select
                                        className="px-6 py-2 rounded-full mt-3 bg-white animate-fade-up animate-once animate-delay-100 animate-ease-in-out"
                                        id="city"
                                        {...register("city", {
                                            required: true,
                                        })}
                                    >
                                        {districts.sort().map((district) => (
                                            <option
                                                value={district}
                                                key={district}
                                            >
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {mutation.isError && (
                                    <p className="text-red mx-5 mt-5">
                                        {mutation.error.response.data.message
                                            ? mutation.error.response.data
                                                  .message
                                            : mutation.error.message}
                                    </p>
                                )}
                                <div className="flex max-sm:flex-col justify-between my-10">
                                    <button
                                        type="submit"
                                        disabled={mutation.isLoading}
                                        className="bg-blue px-5 py-3 rounded-full text-white font-medium text-xl min-[414px]:text-2xl max-sm:mb-5 hover:underline animate-fade-up animate-once animate-delay-300 animate-ease-in-out"
                                    >
                                        <FontAwesomeIcon
                                            icon={faRightToBracket}
                                            className="mr-3"
                                        />
                                        {mutation.isLoading
                                            ? "Registering..."
                                            : "Register"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <img
                            src={roofTopImage}
                            alt="Roof Top Image"
                            className="max-sm:hidden w-[100%] md:w-[80%] self-center lg:w-[50%] max-md:absolute lg:absolute max-[720px]:-bottom-72 bottom-0 right-0"
                        />
                    </div>{" "}
                </>
            )}
        </>
    );
}
