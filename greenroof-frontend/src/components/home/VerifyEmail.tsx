import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVerifyEmail } from "../../hooks/useLogin";

interface Props {
    token: string;
}

export default function VerifyEmail({ token }: Props) {
    const { isSuccess, isLoading } = useVerifyEmail(token);
    return isSuccess ? (
        <>
            <FontAwesomeIcon
                icon={faCircleCheck}
                fontSize={22}
                className="self-center text-greenttl ml-2"
            />
            <h2 className="text-2xl font-semibold text-greenttl self-center ml-3">
                Email Verification Successful!
            </h2>
        </>
    ) : (
        isLoading && (
            <h2 className="text-2xl font-semibold self-center ml-3">
                Checking...
            </h2>
        )
    );
}
