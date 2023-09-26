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
            <h3 className="text-[11px] md:text-[14px] text-justify dark:text-white break-all">
                {fullText ? (
                    text
                ) : (
                    <>
                        {text.slice(0, 200) + "... "}
                        <Link
                            to={"/forum/post/" + id}
                            className="font-semibold dark:text-darksecondary"
                        >
                            Read More
                        </Link>
                    </>
                )}
            </h3>
        </>
    );
}
