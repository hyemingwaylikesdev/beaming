import { useSetRecoilState } from "recoil";

import { userState } from "@/store";

export function useResetUser() {
  const setUser = useSetRecoilState(userState);

  return () => {
    setUser({ email: "", password: "", isAuth: false });
  };
}
