export default function ProfileLoader() {
    return (
        <div className="animate-pulse sm:flex justify-evenly py-7">
            <div className="flex ml-5">
                <div className="bg-graylt max-[490px]:w-[80px] max-[490px]:h-[80px] w-[104px] h-[104px] rounded-full"></div>
                <div className="ml-5 self-center">
                    <div className="bg-graylt rounded h-3 mb-5 w-[150px]"></div>
                    <div className="bg-graylt rounded mb-5 h-3 w-[100px]"></div>
                    <div className="bg-graylt rounded mb-5 h-3 w-[80px]"></div>
                </div>
            </div>
            <div className="flex flex-col max-sm:mt-5 justify-evenly">
                <div className="flex mt-5 self-center">
                    <div className="text-center self-center mx-5 md:mx-8">
                        <div className="bg-graylt rounded mb-5 h-3 w-[80px]"></div>
                        <div className="bg-graylt rounded mb-5 h-3 w-[120px]"></div>
                    </div>
                    <div className="text-center self-center mx-5 md:mx-8">
                        <div className="bg-graylt rounded mb-5 h-3 w-[80px]"></div>
                        <div className="bg-graylt rounded mb-5 h-3 w-[120px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
