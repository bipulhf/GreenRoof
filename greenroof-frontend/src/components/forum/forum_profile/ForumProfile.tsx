import { useParams } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";
import AskQuestion from "../AskQuestion";
import ForumFeedQuestion from "../forum_feed/ForumFeedQuestion";
import ForumUserInfo from "./ForumUserInfo";
import useUserQuestions from "../../../hooks/useUserQuestions";
import ProfileLoader from "../../ProfileLoader";
import QuestionLoader from "../QuestionLoader";

export default function ForumProfile() {
    const { username } = useParams();
    const {
        data: questions,
        error,
        isLoading,
    } = useUserQuestions(username || "");
    const { data: users, isLoading: userLoading } = useProfile(username || "");
    const userProfile = users != null ? users[0] : null;
    return (
        <>
            {error && <p>Network Error...</p>}
            <div className="grid justify-end">
                <AskQuestion />
            </div>
            {userLoading && <ProfileLoader />}
            <ForumUserInfo
                firstName={userProfile?.firstName || ""}
                lastName={userProfile?.lastName || ""}
                username={userProfile?.username || ""}
                city={userProfile?.city || ""}
                // profilePhoto={userProfile?.profilePhoto}
            />
            {isLoading && <QuestionLoader />}
            <ul className="divide-y divide-graybg">
                {questions?.map((question) => (
                    <li key={question.id} className="pt-5 pb-5">
                        <ForumFeedQuestion
                            id={question.id}
                            questionTitle={question.questionTitle}
                            questionText={question.questionText}
                            createdAt={question.createdAt}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
