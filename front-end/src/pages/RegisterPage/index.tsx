import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

import useRegister from "@/hooks/useRegister";
import { registerFormState } from "@/store";
type FormData = {
  email: string;
  password: string;
  passwordAgain: string;
  image: string;
};
const LoginPage = () => {
  const setRegisterForm = useSetRecoilState(registerFormState);
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: "onChange" });

  const { register } = useRegister();

  const onSubmit = async (data: FormData) => {
    const body = {
      email: data.email,
      password: data.password,
      passwordAgain: data.passwordAgain,
      image: `https://via.placeholder.com/600x400?text=no+user+image`,
    };

    console.log(data);
    setRegisterForm(body);

    try {
      const response = await register(body); // useRegister 훅에서 반환된 register 함수를 사용합니다.
      console.log(response); // 등록 요청의 응답을 콘솔에 출력합니다.
      toast.info("Register Success!"); // 등록 요청이 성공하면 토스트 메시지를 출력합니다.
      reset();
    } catch (error) {
      console.error(error); // 등록 요청이 실패하면 에러를 콘솔에 출력합니다.
      toast.error("Register Failed!"); // 등록 요청이 실패하면 토스트 메시지를 출력합니다.
    }
  };

  const userEmail = {
    required: "Email is required",
  };
  const userPassword = {
    required: "Password is required",
  };

  const userPasswordAgain = {
    required: "Password Again is required",
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          DO YOU WANNA JOIN US?
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              {...formRegister("email", userEmail)}
              type="email"
              id="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              id="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              {...formRegister("password", userPassword)}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="passwordAgain"
              id="passwordAgain"
              className="block text-sm font-semibold text-gray-800"
            >
              Password Again
            </label>
            <input
              {...formRegister("passwordAgain", userPasswordAgain)}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.passwordAgain && (
              <p className="text-red-500 text-xs italic">
                {errors.passwordAgain.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              YES!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
