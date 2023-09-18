import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useGetVoteStatus, useVote } from "../../../hooks/useVote";

interface Props {
    answerId: number;
    score: number;
}

export default function ForumVote({ answerId, score }: Props) {
    const { data } = useGetVoteStatus(answerId);
    const mutation = useVote(answerId);

    const [isUpvote, setUpvote] = useState(data?.voteNo);
    const [isDownvote, setDownvote] = useState(data?.voteNo);
    const upVote = () => {
        setUpvote(1);
        setDownvote(0);
        mutation.mutate(true);
    };
    const downVote = () => {
        setDownvote(-1);
        setUpvote(0);
        mutation.mutate(false);
    };
    useEffect(() => {
        setUpvote(data?.voteNo);
        setDownvote(data?.voteNo);
    }, [data]);

    return (
        data && (
            <>
                <div className="flex flex-col items-center">
                    <button onClick={upVote} disabled={isUpvote == 1}>
                        <FontAwesomeIcon
                            icon={faCaretUp}
                            fontSize={25}
                            color={isUpvote == 1 ? "green" : "black"}
                        />
                    </button>
                    <p className="ml-1 font-medium text-[14px]">{score}</p>
                    <button onClick={downVote} disabled={isDownvote == -1}>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            fontSize={25}
                            color={isDownvote == -1 ? "green" : "black"}
                        />
                    </button>
                </div>
                {mutation.isError && (
                    <p className="text-red">
                        {mutation.error.response.data.message
                            ? mutation.error.response.data.message
                            : mutation.error.message}
                    </p>
                )}
            </>
        )
    );
}
