import ForumFeedQuestion from "../forum_feed/ForumFeedQuestion";
import ForumQuestionerInfo from "../forum_feed/ForumQuestionerInfo";
import ForumAnswer from "./ForumAnswer";
import ForumAnswererInfo from "./ForumAnswererInfo";

export default function ForumPost() {
    return (
        <>
            <div className="divide-y divide-graybg">
                <p className="font-semibold text-gray text-[11px] sm:text-[13px] md:text-[16px]">
                    Question
                </p>
                <div className="grid grid-cols-10 pt-5 pb-5">
                    <ForumQuestionerInfo />
                    <ForumFeedQuestion />
                </div>
                <p className="font-semibold text-gray text-[11px] sm:text-[13px] md:text-[16px]">
                    Answers
                </p>
                <div className="grid grid-cols-10 pt-5 pb-5">
                    <ForumAnswererInfo />
                    <ForumAnswer />
                </div>
                <div className="grid grid-cols-10 pt-5 pb-5">
                    <ForumAnswererInfo />
                    <ForumAnswer />
                </div>
            </div>
        </>
    );
}
