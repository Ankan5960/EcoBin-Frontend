import { create } from "zustand";
import { IApiErrorData } from "../signup-page/signup.model";

type LoginStateStore = {
  emailValue: string;
  passwordValue: string;
  emailInValid: boolean;
  passwordInValid: boolean;
  isFormValid: boolean;
  apiError: IApiErrorData | null;
  isRequestPending: boolean;
};

const useLoginStore = create<LoginStateStore>(() => ({
  emailValue: "",
  passwordValue: "",
  emailInValid: false,
  passwordInValid: false,
  isFormValid: false,
  apiError: null,
  isRequestPending: false,
}));

const createLoginStoreHooks = () => ({
  useEmailValue: () => useLoginStore((state) => state.emailValue),
  usePasswordValue: () => useLoginStore((state) => state.passwordValue),
  useEmailInValid: () => useLoginStore((state) => state.emailInValid),
  usePasswordInValid: () => useLoginStore((state) => state.passwordInValid),
  useIsFormValid: () => useLoginStore((state) => state.isFormValid),
  useApiError: () => useLoginStore((state) => state.apiError),
  useIsRequestPending: () => useLoginStore((state) => state.isRequestPending),
  setEmailValue: (value: string) =>
    useLoginStore.setState({ emailValue: value }),
  setPasswordValue: (value: string) =>
    useLoginStore.setState({ passwordValue: value }),
  setEmailInValid: (value: boolean) =>
    useLoginStore.setState({ emailInValid: value }),
  setPasswordInValid: (value: boolean) =>
    useLoginStore.setState({ passwordInValid: value }),
  setIsFormValid: (value: boolean) =>
    useLoginStore.setState({ isFormValid: value }),
  setApiError: (value: IApiErrorData | null) =>
    useLoginStore.setState({ apiError: value }),
  setIsRequestPending: (value: boolean) =>
    useLoginStore.setState({ isRequestPending: value }),
});

export const loginStoreHooks = createLoginStoreHooks;
