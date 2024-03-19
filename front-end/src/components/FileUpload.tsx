import imageCompression from "browser-image-compression";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import axiosInstance from "../util/axios";

type FileUploadProps = {
  onImageChange: (images: string[]) => void;
  images: string[];
};

const FileUpload = ({ onImageChange, images }: FileUploadProps) => {
  const handleDrop = async (acceptedFiles: File[]) => {
    const imageFile = acceptedFiles[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      const formData = new FormData();
      formData.append("file", compressedFile);

      const response = await axiosInstance.post("/products/image", formData);
      onImageChange([...images, response.data.fileName]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = (image: string) => {
    const newImages = images.filter((img) => img !== image);
    onImageChange(newImages);
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop: handleDrop,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <div className="flex gap-4">
      <div
        {...getRootProps()}
        className="min-w-[300px] h-[300px] border flex items-center justify-center"
      >
        <input {...getInputProps()} />
        <p className="text-3xl">+</p>
      </div>

      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {images.map((image) => {
          return (
            <div key={image} onClick={() => handleDelete(image)}>
              <img
                className="min-w-[300px] h-[300px] bg-cover bg-center"
                src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                alt={image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileUpload;
