import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    score: number;
}

export default function ForumVote({ score }: Props) {
    return (
        <>
            <div className="flex flex-col items-center">
                <a href="">
                    <FontAwesomeIcon icon={faCaretUp} fontSize={25} />
                </a>
                <p className="ml-1 font-medium text-[14px]">{score}</p>
                <a href="">
                    <FontAwesomeIcon icon={faCaretDown} fontSize={25} />
                </a>
            </div>
        </>
    );
}
