interface Props {
    firstName: string;
    lastName: string;
    score: number;
}

export default function Name({ firstName, lastName, score }: Props) {
    return (
        <span
            className={
                score > 50
                    ? "text-greenttl dark:text-green"
                    : score > 25
                    ? "text-brown"
                    : "text-black dark:text-white"
            }
        >
            {firstName + " " + lastName}
        </span>
    );
}
