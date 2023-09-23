import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useCreatePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostAttatchments } from "../../services/types";
import uploadImages from "../../services/ImageUpload";

interface Inputs {
    postText: string;
}

export default function CommunityCreatePost() {
  const mutation = useCreatePost();
  const [images, setImages] = useState<File[]>([]);

  const [prevImages, setPrevImages] = useState<(string | ArrayBuffer)[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const ImgDataUrl = (image: File) => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (r) => {
        return r.target?.result;
      };
      reader.readAsDataURL(image);
    }
    return "";
  };
    const mutation = useCreatePost();
    const [images, setImages] = useState<File[]>([]);
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
        Promise.allSettled(imagesPromises).then((promisesArr) => {
            promisesArr.map((link) => {
                postAttatchments.push({ link: link.value });
            });
            mutation.mutate({
                postText: data.postText,
                postAttatchments: postAttatchments,
            });
            setClicked(false);
        });
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                postText: "",
            });
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

        Promise.all(readers).then((values) => {
            setPrevImages(values);
        });
    };

    return (
        <div className="py-5 px-2 grid grid-cols-8">
            <img
                src={user_profile_photo}
                alt="Profile Photo"
                className="col-span-1 ml-5 min-h-[40px] min-w-[40px]"
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-7 flex max-[500px]:ml-10"
            >
                <textarea
                    {...register("postText")}
                    className="text-[16px] h-[80px] md:h-[105px] w-[90%] resize-none focus:outline-none"
                    name="postText"
                    id="postText"
                    placeholder="Share your photos, experiences..."
                    autoComplete="off"
                />

        <div className="flex flex-col justify-evenly">
          <label>
            <FontAwesomeIcon
              icon={faImage}
              fontSize={16}
              color="#B97246"
              className="hover:cursor-pointer"
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
            className="relative self-center h-fit border rounded-full bg-greenbtn text-white text-[16px] px-5 py-1"
          >
            {mutation.isLoading ? "Posting..." : "Post"}
          </button>
        </div>

        {prevImages.map((image, index) => (
          <img key={index} src={image.toString()} alt={`preview ${index}`} />
        ))}

        {mutation.isError && (
          <p className="text-red">
            {mutation.error.response.data.message
              ? mutation.error.response.data.message
              : mutation.error.message}
          </p>
        )}
      </form>
    </div>
  );
                <div className="flex flex-col justify-evenly">
                    <label>
                        <FontAwesomeIcon
                            icon={faImage}
                            fontSize={16}
                            color="#B97246"
                            className="hover:cursor-pointer"
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
                        disabled={clicked}
                        className="relative self-center h-fit border rounded-full bg-greenbtn text-white text-[16px] px-5 py-1"
                    >
                        {clicked
                            ? mutation.isSuccess
                                ? "Post"
                                : "Posting..."
                            : "Post"}
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
        </div>
    );
}
