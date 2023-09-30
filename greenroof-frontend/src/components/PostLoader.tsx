export default function PostLoader() {
    return (
        <div className="animate-pulse py-5 px-3 grid grid-cols-10">
            <div className="col-span-1 bg-graylt rounded-full max-[350px]:col-span-2 ml-2 w-[40px] h-[40px]"></div>
            <div className="ml-5 max-[350px]:col-span-8 col-span-9">
                <div className="rounded h-3 w-[25%] pb-1 bg-graylt mb-5"></div>
                <div className="rounded pb-2 h-3 w-[95%] bg-graylt mb-5"></div>
                <div className="rounded pb-2 h-3 w-[80%] bg-graylt mb-5"></div>
                <div className="rounded h-3 w-[10%] bg-graylt"></div>
            </div>
        </div>
    );
}
