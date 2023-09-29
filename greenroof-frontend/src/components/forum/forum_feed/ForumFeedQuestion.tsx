import { Link, useParams } from "react-router-dom";
import ReadMore from "./ReadMore";
import { PostAttatchments, Tag } from "../../../services/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Props {
    id: number;
    questionTitle: string;
    questionText: string;
    forumAttatchments: PostAttatchments[];
    questionTag: Tag[];
    createdAt: Date;
}

export default function ForumFeedQuestion({
    id,
    questionTitle,
    questionText,
    forumAttatchments,
    questionTag,
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
                    <>
                        <ReadMore fullText={true}>{questionText}</ReadMore>
                        {forumAttatchments.length > 0 && (
                            <div className="slider-wrapper mt-3 mb-2">
                                <Swiper
                                    navigation={true}
                                    modules={[Navigation]}
                                    className="slider"
                                >
                                    {forumAttatchments
                                        .sort()
                                        .map((forumAttatchment) => (
                                            <SwiperSlide
                                                key={forumAttatchment.id}
                                            >
                                                <img
                                                    id={forumAttatchment.id?.toString()}
                                                    src={
                                                        forumAttatchment.link ||
                                                        ""
                                                    }
                                                    alt="Photo"
                                                    loading="lazy"
                                                />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        )}
                    </>
                )}
                <p className="my-2 text-gray text-[12px] md:text-[14px]">
                    {new Date(createdAt).toLocaleString()}
                </p>
                <div className="flex">
                    {questionTag.map((tag) => (
                        <Link
                            to={"/forum/tag/" + tag.tag}
                            key={tag.id}
                            className="bg-graybg dark:bg-darkprimary py-1 px-2 mr-3 dark:text-white"
                        >
                            {tag.tag}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
