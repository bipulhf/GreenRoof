import axios from "axios";

const url = import.meta.env.VITE_CLOUDINARY_URL as string;
const uploadKey = import.meta.env.VITE_CLOUDINARY_UPLOAD_KEY as string;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME as string;
const uploadImages = (image: File) => {
    return new Promise<string>((resolve) => {
        const imgData = new FormData();
        imgData.append("file", image);
        imgData.append("upload_preset", uploadKey);
        imgData.append("cloud_name", cloudName);
        axios.post(url, imgData).then((response) => {
            const url = response.data.url;
            const sliceIndex = 49;
            const optimizedUrl =
                url.slice(0, 4) +
                "s" +
                url.slice(4, sliceIndex) +
                "q_auto/f_auto/" +
                url.slice(sliceIndex);
            resolve(optimizedUrl);
            console.log(optimizedUrl);
        });
    });
};

export default uploadImages;
