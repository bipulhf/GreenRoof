import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AIAssistantButton() {
    return (
        <>
            <a href="https://greenroof-ai-assistant.vercel.app">
                <span className="m-3">
                    <FontAwesomeIcon
                        icon={faRobot}
                        fontSize={20}
                        className="text-greenbtn dark:text-green"
                    />
                </span>
                <span className="font-medium text-greenbtn text-[20px] dark:text-green hover:underline">
                    AI Assistant
                </span>
            </a>
        </>
    );
}
