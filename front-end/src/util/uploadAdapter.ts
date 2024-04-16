/* eslint-disable @typescript-eslint/no-explicit-any */
import imageCompression from "browser-image-compression";

import axiosInstance from "./axios";

const uploadAdapter = (loader: { file: Promise<any> }) => {
  return {
    upload() {
      return loader.file
        .then(async (file: Blob) => {
          const fileAsFileObject = new File([file], "filename", { type: file.type });
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(fileAsFileObject, options);
          const formData = new FormData();
          const filename = "beaming.png";
          formData.append("file", compressedFile, filename);
          return axiosInstance.post("/products/image", formData);
        })
        .then((res) => {
          return {
            default: `${import.meta.env.VITE_SERVER_URL}/${res.data.fileName}`,
          };
        })
        .catch((error) => {
          console.error("Error reading file:", error);
        });
    },
  };
};

export default uploadAdapter;
