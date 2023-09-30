import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateQuestion } from "../../../hooks/useQuestion";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import PopupLoading from "../../PopupLoading";
import { PostAttatchments } from "../../../services/Types";
import uploadImages from "../../../services/ImageUpload";
import { TagsInput } from "react-tag-input-component";

interface Inputs {
    questionTitle: string;
    questionText: string;
}

interface Tag {
    tag: string;
}

export default function ForumCreatePost() {
    const mutation = useCreateQuestion();
    const [images, setImages] = useState<File[]>([]);
    const [selected, setSelected] = useState([]);
    const [prevImages, setPrevImages] = useState<(string | ArrayBuffer)[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const questionTag: Tag[] = [];
        selected.map((tag) => {
            questionTag.push({ tag });
        });
        const forumAttatchments: PostAttatchments[] = [];
        const imagesPromises = images.map(
            async (image) => await uploadImages(image)
        );
        Promise.allSettled(imagesPromises)
            .then((promisesArr) => {
                promisesArr.map((link) => {
                    forumAttatchments.push({ link: link.value });
                });
                mutation.mutate({
                    questionTitle: data.questionTitle,
                    questionText: data.questionText,
                    questionTag: questionTag,
                    forumAttatchments: forumAttatchments,
                });
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                questionText: "",
                questionTitle: "",
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
        <div className={`${mutation.isLoading ? `bg-grabg opacity-10` : ``}`}>
            <h2 className="font-bold text-[14px] sm:text-[16px] md:text-[22px] dark:text-white">
                Ask Question
            </h2>
            {mutation.isLoading && (
                <Popup modal open={mutation.isLoading} closeOnDocumentClick>
                    <PopupLoading />
                </Popup>
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mr-[10px] m-[15px] sm:m-[25px] md:m-[30px]"
            >
                <label className="font-medium sm:text-xl dark:text-white">
                    Post Title:{" "}
                </label>
                <input
                    {...register("questionTitle", {
                        required: true,
                        minLength: 10,
                    })}
                    type="text"
                    name="questionTitle"
                    className="text-[14px] sm:text-[17px] md:text-[22px] border-2 border-gray rounded-lg p-1 sm:p-3 dark:bg-darkbg dark:text-white outline-none"
                    placeholder="Enter your Question Title"
                    aria-invalid={errors.questionTitle ? "true" : "false"}
                    required
                    autoFocus
                    autoComplete="off"
                />
                {errors.questionTitle && (
                    <p className="font-medium text-red">
                        Question Title must be greater than 10 characters.
                    </p>
                )}
                <label className="mt-[15px] font-medium sm:text-xl dark:text-white">
                    Description of your question:{" "}
                </label>
                <textarea
                    {...register("questionText", {
                        required: true,
                        minLength: 10,
                    })}
                    className="text-[12px] sm:text-[14px] md:text-[16px] w-full border-2 border-gray rounded-lg p-1 sm:p-3 h-[150px] dark:bg-darkbg dark:text-white outline-none"
                    name="questionText"
                    placeholder="Type your question descriptively..."
                    aria-invalid={errors.questionText ? "true" : "false"}
                    required
                    autoComplete="off"
                />
                {errors.questionText && (
                    <p className="font-medium text-red">
                        Question Text must be greater than 10 characters.
                    </p>
                )}
                {mutation.isError && (
                    <p className="text-red">
                        {mutation.error.response.data.message
                            ? mutation.error.response.data.message
                            : mutation.error.message}
                    </p>
                )}
                <div className="mt-5 outline-none">
                    <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="tags"
                        placeHolder="Enter Tags..."
                    />
                </div>
                <input
                    type="file"
                    name="img"
                    id="img"
                    onChange={handleImages}
                    multiple
                    accept="image/*"
                    className="mt-5"
                />
                <div className="flex">
                    {prevImages.map((image, index) => (
                        <img
                            key={index}
                            src={image.toString()}
                            alt={`preview ${index}`}
                            className="h-[60px] px-1 mt-5"
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="p-1 w-[120px] sm:w-[200px] my-[15px] rounded-full bg-greenbtn text-white text-[12px] hover:bg-greenttl sm:text-[15px] md:text-[18px] md:px-3 font-medium"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Posting..." : "Ask your question"}
                </button>
            </form>
        </div>
    );
}
