import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useCreatePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostAttatchments } from "../../services/Types";
import uploadImages from "../../services/ImageUpload";

interface Inputs {
    postText: string;
}

interface Props {
    profilePhoto: string;
}

export default function CommunityCreatePost({ profilePhoto }: Props) {
    const mutation = useCreatePost();
    const [images, setImages] = useState<File[]>([]);

    const [prevImages, setPrevImages] = useState<(string | ArrayBuffer)[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();

    const [clicked, setClicked] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setClicked(true);
        const postAttatchments: PostAttatchments[] = [];
        const imagesPromises = images.map(
            async (image) => await uploadImages(image)
        );
        Promise.allSettled(imagesPromises)
            .then((promisesArr) => {
                promisesArr.map((link) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    postAttatchments.push({ link: link.value });
                });
                mutation.mutate({
                    postText: data.postText,
                    postAttatchments: postAttatchments,
                });
                setClicked(false);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                postText: "",
            });
            setPrevImages([]);
        }
    }, [isSubmitSuccessful, reset]);

    const convertImgToDataURL = (file: File) => {
        return new Promise<string | ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target!.result!);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files!);
        setImages(files);

        const readers = files.map((file) => {
            return convertImgToDataURL(file);
        });

        Promise.all(readers)
            .then((values) => {
                setPrevImages(values);
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className="py-5 px-2 grid grid-cols-8 dark:bg-darkbg">
            <div className="profile-img">
                <img
                    src={profilePhoto}
                    alt="Profile Photo"
                    className="col-span-1 ml-5 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] rounded-full"
                />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-7 flex max-[500px]:ml-10 dark:text-white"
            >
                <textarea
                    {...register("postText")}
                    className="text-[16px] h-[80px] md:h-[105px] w-[90%] resize-none focus:outline-none dark:bg-darkbg dark:text-white"
                    name="postText"
                    id="postText"
                    placeholder="Share your photos, experiences..."
                    autoComplete="off"
                />

                <div className="flex flex-col justify-evenly">
                    <label className="self-center">
                        <FontAwesomeIcon
                            icon={faImage}
                            fontSize={16}
                            className="hover:cursor-pointer text-brown dark:text-darksecondary"
                        />{" "}
                        <input
                            type="file"
                            name="img"
                            id="img"
                            onChange={handleImages}
                            multiple
                            style={{ display: "none" }}
                            accept="image/*"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="relative self-center h-fit rounded-full bg-greenbtn text-white text-[16px] px-5 py-1"
                    >
                        {clicked ? "Posting..." : "Post"}
                    </button>
                </div>

                {mutation.isError && (
                    <p className="text-red">
                        {mutation.error.response.data.message
                            ? mutation.error.response.data.message
                            : mutation.error.message}
                    </p>
                )}
            </form>
            {prevImages.map((image, index) => (
                <img
                    key={index}
                    src={image.toString()}
                    alt={`preview ${index}`}
                    className="h-[60px] p-1 preview"
                />
            ))}
        </div>
    );
}
