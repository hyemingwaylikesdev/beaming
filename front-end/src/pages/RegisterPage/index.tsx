import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  passwordAgain: string;
};
const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = (data: FormData) => {
    console.log(data);
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
              {...(register("email"), { required: true })}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              {...(register("password"), { required: true })}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="passwordAgain"
              className="block text-sm font-semibold text-gray-800"
            >
              Password Again
            </label>
            <input
              {...(register("passwordAgain"), { required: true })}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
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
