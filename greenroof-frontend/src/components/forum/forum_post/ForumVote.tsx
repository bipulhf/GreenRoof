import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useGetVoteStatus, useVote } from "../../../hooks/useVote";
import { token } from "../../../services/jwt-token";

interface Props {
    answerId: number;
    score: number;
}

export default function ForumVote({ answerId, score }: Props) {
    const { data } = useGetVoteStatus(token, answerId);
    const mutation = useVote(token, answerId);

    const [isUpvote, setUpvote] = useState(false);
    const [isDownvote, setDownvote] = useState(false);
    const upVote = () => {
        setUpvote(true);
        setUpvote(false);
        mutation.mutate(true);
    };
    const downVote = () => {
        setDownvote(true);
        setUpvote(false);
        mutation.mutate(false);
    };

    return (
        data && (
            <>
                <div className="flex flex-col items-center">
                    <button onClick={upVote} disabled={isUpvote}>
                        <FontAwesomeIcon
                            icon={faCaretUp}
                            fontSize={25}
                            color={isUpvote ? "green" : "black"}
                        />
                    </button>
                    <p className="ml-1 font-medium text-[14px]">{score}</p>
                    <button onClick={downVote} disabled={isDownvote}>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            fontSize={25}
                            color={isDownvote ? "green" : "black"}
                        />
                    </button>
                </div>
            </>
        )
    );
}
