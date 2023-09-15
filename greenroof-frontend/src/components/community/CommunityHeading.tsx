interface Props {
    heading: string;
}

export default function CommunityHeading({ heading }: Props) {
    return (
        <div className="pt-9 pb-5">
            <h1 className="font-bold text-[22px] text-brown text-center">
                {heading}
            </h1>
        </div>
    );
}
