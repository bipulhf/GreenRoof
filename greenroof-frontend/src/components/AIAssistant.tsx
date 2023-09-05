import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AIAssistant() {
    return (
        <>
            <button>
                <span className="m-3">
                    <FontAwesomeIcon
                        icon={faRobot}
                        color="#347E32"
                        fontSize={20}
                    />
                </span>
                <span className="font-medium text-greenbtn text-[20px]">
                    AI Assistant
                </span>
            </button>
        </>
    );
}
