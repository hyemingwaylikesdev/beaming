import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import ContentsEditor from "@/components/ContentsEditor";
import FileUpload from "@/components/FileUpload";
import { userAuthData } from "@/store";
import axiosInstance from "@/util/axios";

const category = [
  { key: 1, value: "top" },
  { key: 2, value: "jeans" },
  { key: 3, value: "dress" },
  { key: 4, value: "shoes" },
  { key: 5, value: "accessories" },
  { key: 6, value: "hats" },
];

type FormData = {
  title: string;
  description: string;
  price: number;
  category: number;
  images: string[];
};

const UploadProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({ mode: "onChange" });
  const userData = useRecoilValue(userAuthData);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await axiosInstance.post("/products", { writer: userData.id, ...data });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImages = (newImages: string[]) => {
    setValue("images", newImages);
  };

  const imagesValue = watch("images", []);
  return (
    <section>
      <div className="text-center m-7">
        <h1>예상 상품 업로드</h1>
      </div>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <FileUpload images={imagesValue} onImageChange={handleImages} />
        <div className="mt-4">
          <label htmlFor="title">이름</label>
          <input
            className="w-full px-4 py-2 bg-white border rounded-md"
            id="title"
            {...register("title", { required: "Title is required" })}
            type="title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="price">가격</label>
          <input
            className="w-full px-4 py-2 bg-white border rounded-md"
            type="number"
            id="price"
            {...register("price", { required: true })}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="category">카테고리</label>
          <select
            className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
            id="category"
            {...register("category", { required: true })}
          >
            {category.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="editor">상세 설명</label>
          <ContentsEditor
            fieldName="description"
            onChange={(data) => setValue("description", data)}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700"
          >
            생성하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default UploadProductPage;
