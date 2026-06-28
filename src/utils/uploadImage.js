import toast from "react-hot-toast";

export async function uploadImage(imageFile) {
  const toastId = toast.loading("Uploading artwork...");

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error();
    }

    toast.success("Image uploaded!", {
      id: toastId,
    });

    return data.data.url;
  } catch {
    toast.error("Image upload failed!", {
      id: toastId,
    });

    throw new Error("Image upload failed");
  }
}