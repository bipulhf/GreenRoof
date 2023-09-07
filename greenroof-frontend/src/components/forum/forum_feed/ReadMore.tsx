import { Link } from "react-router-dom";

interface Props {
    id?: number;
    fullText: boolean;
    children: string;
}

export default function ReadMore({ id, children, fullText }: Props) {
    const text = children;
    return (
        <>
            <h3 className="text-[11px] md:text-[14px] text-justify">
                {fullText ? text : text.slice(0, 100) + "... "}
                {fullText ? null : (
                    <Link to={"/forum/post/" + id} className="font-semibold">
                        Read More
                    </Link>
                )}
            </h3>
        </>
    );
}
