import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function PasswordResetSuccessful() {
    return (
        <div className="modal text-center divide-y divide-graybg bg-white border-2 border-blue font-semibold pb-5">
            <div className="flex p-5">
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    fontSize={24}
                    className="text-greenttl"
                />
                <h1 className="pl-3 text-3xl">
                    Your password has been changed successfully.
                </h1>
            </div>
            <h2 className="text-xl p-5">
                Please login to your account using your new password.
            </h2>
            <Link
                to={"/login"}
                className="text-xl text-white bg-greenttl px-4 py-2 rounded-full hover:underline"
            >
                Login
            </Link>
        </div>
    );
}
