/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axios";

const uploadAdapter = (loader: { file: Promise<any> }) => {
  return {
    upload() {
      return new Promise((resolve, reject) => {
        loader.file
          .then((file: Blob) => {
            const formData = new FormData();
            const filename = "beaming.png";
            formData.append("file", file, filename);
            axiosInstance
              .post("/products/image", formData)
              .then((res) => {
                console.log("Full response:", res);
                console.log("???", res);
                resolve({
                  default: `${import.meta.env.VITE_SERVER_URL}/${res.data.fileName}`,
                });
              })
              .catch((err) => reject(err));
          })
          .catch((error) => {
            console.error("Error reading file:", error);
          });
      });
    },
  };
};

export default uploadAdapter;
