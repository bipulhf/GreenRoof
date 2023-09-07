import { useParams } from "react-router-dom";
import ForumFeedQuestion from "../forum_feed/ForumFeedQuestion";
import ForumQuestionerInfo from "../forum_feed/ForumQuestionerInfo";
import ForumAnswer from "./ForumAnswer";
import ForumAnswererInfo from "./ForumAnswererInfo";
import useQuestion from "../../../hooks/useQuestion";
import useAnswer from "../../../hooks/useAnswer";

export default function ForumPost() {
    const { postId } = useParams();
    const {
        data: questions,
        error,
        isLoading,
    } = useQuestion(parseInt(postId || "0"));

    const { data: answers } = useAnswer(parseInt(postId || "0"));

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Network Error...</p>}
            <div className="divide-y divide-graybg">
                <p className="font-semibold text-gray text-[11px] sm:text-[13px] md:text-[16px]">
                    Question
                </p>
                <div className="grid grid-cols-10 pt-5 pb-5">
                    <ForumQuestionerInfo
                        firstName={questions?.questioner.firstName || ""}
                        lastName={questions?.questioner.lastName || ""}
                        username={questions?.questioner.username || ""}
                    />
                    <ForumFeedQuestion
                        id={questions?.id || 0}
                        questionTitle={questions?.questionTitle || ""}
                        questionText={questions?.questionText || ""}
                        createdAt={questions?.createdAt || new Date()}
                    />
                </div>
                <p className="font-semibold text-gray text-[11px] sm:text-[13px] md:text-[16px]">
                    Answers
                </p>
                <ul>
                    {answers?.map((answer) => (
                        <li key={answer.id} className=" grid grid-cols-10 py-4">
                            <ForumAnswererInfo
                                firstName={answer?.answerer.firstName || ""}
                                lastName={answer?.answerer.lastName || ""}
                                username={answer?.answerer.username || ""}
                            />
                            <ForumAnswer
                                id={answer?.id || 0}
                                answerText={answer?.answerText || ""}
                                createdAt={answer?.createdAt || new Date()}
                                score={answer?.score || 0}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
