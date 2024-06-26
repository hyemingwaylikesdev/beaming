import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const registerFormState = atom({
  key: "registerFormState",
  default: {
    email: "",
    password: "",
    passwordAgain: "",
    image: "",
  },
});

export const userState = atom({
  key: "userState",
  default: {
    email: "",
    password: "",
  },
});

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    isAuth: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userAuthData = atom({
  key: "userAuthData",
  default: {
    id: "",
    email: "",
    role: 0,
    image: "",
    cart: [{ id: "", quantity: 0, product: {} }],
  },
});

export const inputState = atom({
  key: "inputState",
  default: "",
});
