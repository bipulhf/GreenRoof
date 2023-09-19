export default function QuestionLoader() {
    return (
        <div className="animate-pulse grid grid-cols-10 pt-5 pb-5">
            <div className="self-center col-span-4 sm:col-span-3 md:col-span-2 text-center mr-4">
                <div className="flex mb-3">
                    <div className="bg-graylt rounded-full ml-2 w-[40px] h-[40px]"></div>
                    <div className="ml-4">
                        <div className="rounded h-3 mb-5 w-[90px] bg-graylt"></div>
                        <div className="rounded h-3 w-[60px] bg-graylt"></div>
                    </div>
                </div>
            </div>
            <div className="col-span-6 sm:col-span-7 md:col-span-8">
                <div className="rounded h-3 w-[25%] pb-1 bg-graylt mb-5"></div>
                <div className="rounded pb-2 h-3 w-[95%] bg-graylt mb-5"></div>
                <div className="rounded pb-2 h-3 w-[80%] bg-graylt mb-5"></div>
                <div className="rounded h-3 w-[10%] bg-graylt"></div>
            </div>
        </div>
    );
}
