import { useEffect } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import axiosInstance from "../util/axios";

type FileUploadProps = {
  onImageChange: (images: string[]) => void;
  images: string[];
};

const FileUpload = ({ onImageChange, images }: FileUploadProps) => {
  useEffect(() => {
    console.log(images);
  }, [images]);
  const handleDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
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
          console.log(`${import.meta.env.VITE_SERVER_URL}/${image}`); // Add this line
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
