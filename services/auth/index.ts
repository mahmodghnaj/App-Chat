import api from "../../helpers/axios";
import { PayloadLogin, PayloadRegister } from "../../store/auth/type";

export const login = async (Payload: PayloadLogin) => {
  const { data } = await api.post("auth/login", Payload);
  return data;
};

export const register = async (Payload: PayloadRegister) => {
  const { data } = await api.post("auth/register", Payload);
  return data;
};
export const me = async () => {
  const { data } = await api.get("auth/me");
  return data;
};

export const logout = () => {};
