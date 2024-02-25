import { atom } from "recoil";

export const registerFormState = atom({
  key: "registerFormState",
  default: {
    email: "",
    password: "",
    passwordAgain: "",
    image: "",
  },
});
