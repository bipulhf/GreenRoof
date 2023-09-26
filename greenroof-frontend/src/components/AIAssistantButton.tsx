import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AIAssistantButton() {
    return (
        <>
            <button>
                <span className="m-3">
                    <FontAwesomeIcon
                        icon={faRobot}
                        fontSize={20}
                        className="text-greenbtn dark:text-white"
                    />
                </span>
                <span className="font-medium text-greenbtn text-[20px] dark:text-white">
                    AI Assistant
                </span>
            </button>
        </>
    );
}
