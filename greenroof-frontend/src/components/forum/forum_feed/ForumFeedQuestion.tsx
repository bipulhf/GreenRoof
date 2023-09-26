import { Link, useParams } from "react-router-dom";
import ReadMore from "./ReadMore";

interface Props {
    id: number;
    questionTitle: string;
    questionText: string;
    createdAt: Date;
}

export default function ForumFeedQuestion({
    id,
    questionTitle,
    questionText,
    createdAt,
}: Props) {
    const params = useParams();
    return (
        <>
            <div className="col-span-6 sm:col-span-7 md:col-span-8">
                <Link to={"/forum/post/" + id}>
                    <h2 className="font-semibold text-[12px] md:text-[16px] dark:text-white">
                        <span className="hidden">{id}</span>
                        {questionTitle}
                    </h2>
                </Link>
                {params.postId == null ? (
                    <ReadMore id={id} fullText={questionText.length < 200}>
                        {questionText}
                    </ReadMore>
                ) : (
                    <ReadMore fullText={true}>{questionText}</ReadMore>
                )}
                <p className="mt-2 text-gray text-[12px] md:text-[14px]">
                    {new Date(createdAt).toLocaleString()}
                </p>
            </div>
        </>
    );
}
