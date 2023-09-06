import { useParams } from "react-router-dom";
import ReadMore from "./ReadMore";

export default function ForumFeedQuestion() {
    const params = useParams();
    return (
        <>
            <div className="col-span-6 sm:col-span-7 md:col-span-8">
                <a href="">
                    <h2 className="font-semibold text-[12px] md:text-[16px]">
                        Lorem Ipsum is simply dummy text of the printing
                    </h2>
                </a>
                {params.postId != null ? (
                    <ReadMore fullText={true}>
                        GeeksforGeeks: A Computer Science portal for geeks. It
                        contains well written, well thought and well explained
                        computer science, programming articles and quizzes. It
                        provides a variety of services for you to learn, so
                        thrive and also have fun! Free Tutorials, Millions of
                        Articles, Live, Online and Classroom Courses ,Frequent
                        Coding Competitions, Webinars by Industry Experts,
                        Internship opportunities, and Job Opportunities.
                        Knowledge is power!
                    </ReadMore>
                ) : (
                    <ReadMore fullText={false}>
                        GeeksforGeeks: A Computer Science portal for geeks. It
                        contains well written, well thought and well explained
                        computer science, programming articles and quizzes. It
                        provides a variety of services for you to learn, so
                        thrive and also have fun! Free Tutorials, Millions of
                        Articles, Live, Online and Classroom Courses ,Frequent
                        Coding Competitions, Webinars by Industry Experts,
                        Internship opportunities, and Job Opportunities.
                        Knowledge is power!
                    </ReadMore>
                )}
                <p className="text-gray text-[12px] md:text-[14px]">
                    15 September, 2023
                </p>
            </div>
        </>
    );
}
