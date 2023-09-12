import ForumVote from "./ForumVote";

interface Props {
    id: number;
    answerText: string;
    score: number;
    createdAt: Date;
}

export default function ForumAnswer({
    id,
    answerText,
    createdAt,
    score,
}: Props) {
    return (
        <>
            <div className="col-span-5 sm:col-span-6 md:col-span-7">
                <span className="hidden">{id}</span>
                <h3 className="text-[11px] md:text-[14px] text-justify">
                    {answerText}
                </h3>
                <p className="mt-2 text-gray text-[12px] md:text-[14px]">
                    {new Date(createdAt).toLocaleString()}
                </p>
            </div>
            <div className="col-span-1">
                <ForumVote answerId={id} score={score} />
            </div>
        </>
    );
}
