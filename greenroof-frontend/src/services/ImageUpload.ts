import axios from "axios";

const uploadImages = (image: File) => {
    return new Promise<string>((resolve) => {
        const imgData = new FormData();
        imgData.append("file", image);
        imgData.append("upload_preset", "jqtskhrp");
        imgData.append("cloud_name", "du7dquv4j");
        axios
            .post(
                "https://api.cloudinary.com/v1_1/du7dquv4j/image/upload",
                imgData
            )
            .then((response) => {
                const url =   response.data.url;
                const sliceIndex = 49;
                const optimizedUrl = url.slice(0, sliceIndex) + "q_auto/f_auto/" + url.slice(sliceIndex);
                resolve(optimizedUrl);
            });
    });
};

export default uploadImages;
