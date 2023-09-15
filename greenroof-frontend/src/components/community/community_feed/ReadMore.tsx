import { useState } from "react";

interface Props {
    children: string;
}

export default function ReadMore({ children }: Props) {
    const [readMore, setReadMore] = useState(true);
    const isReadMore = () => {
        setReadMore(!readMore);
    };
    return (
        <span>
            {readMore && children.length > 200 ? (
                <>
                    {children.slice(0, 200)}
                    <span> ... </span>
                    <button onClick={isReadMore} className="font-semibold">
                        Read More
                    </button>
                </>
            ) : (
                children
            )}
        </span>
    );
}
