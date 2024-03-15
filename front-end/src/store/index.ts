import { atom, useSetRecoilState } from "recoil";
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
    isAuth: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const setUserState = () => {
  return useSetRecoilState(userState);
};
