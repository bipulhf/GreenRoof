export default function CommunityWhoToFollowLoader() {
    return (
        <div className="flex px-[5%] min-[1200px]:px-[10%] pb-[5%] animate-pulse">
            <div className="h-[40px] w-[40px] mr-5 bg-graylt rounded-full"></div>
            <div className="mr-7">
                <div className="bg-graylt w-[80px] h-3 rounded mt-2 mb-3"></div>
                <div className="bg-graylt w-[50px] h-3 rounded"></div>
            </div>
            <div className="self-center h-fit rounded-full bg-graylt px-10 py-5"></div>
        </div>
    );
}
