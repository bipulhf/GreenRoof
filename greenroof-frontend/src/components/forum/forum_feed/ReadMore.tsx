interface Props {
    fullText: boolean;
    children: string;
}

export default function ReadMore({ children, fullText }: Props) {
    const text = children;
    return (
        <>
            <h3 className="text-[11px] md:text-[14px] text-justify">
                {fullText ? text : text.slice(0, 100) + "... "}
                {fullText ? null : (
                    <a className="font-semibold" href="">
                        Read More
                    </a>
                )}
            </h3>
        </>
    );
}
