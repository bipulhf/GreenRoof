import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ForgotPasswordPopUp() {
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
            <h2 className="text-xl p-5">
                Please click on the link that has just been sent to your email
                to continute the process.
            </h2>
        </div>
    );
}
