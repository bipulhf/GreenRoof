import AskQuestion from "../AskQuestion";
import ForumFeedQuestion from "./ForumFeedQuestion";
import ForumQuestionerInfo from "./ForumQuestionerInfo";

export default function ForumFeed() {
    return (
        <>
            <div className="flex justify-between mb-5">
                <h2 className="font-bold text-[14px] sm:text-[16px] md:text-[22px]">
                    Recent Questions
                </h2>
                <AskQuestion />
            </div>
            <div className="divide-y divide-graybg">
                <div className="grid grid-cols-10 pt-5 pb-5">
                    <ForumQuestionerInfo />
                    <ForumFeedQuestion />
                </div>
                <div className="grid grid-cols-10 pt-5 pb-5">
                    <ForumQuestionerInfo />
                    <ForumFeedQuestion />
                </div>
            </div>
        </>
    );
}
