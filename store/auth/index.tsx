import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthType, PayloadLogin, PayloadRegister } from "./type";
import * as AuthService from "../../services/auth/index";
import useStorage from "../../helpers/hooks/useStorage";
import FirstLoading from "../../components/fist-loading";
export const AuthContext = createContext({});
type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fistLoading, setFirstLoading] = useState<boolean>(true);
  const [user, setUser] = useState<null | any>(undefined);
  const [requestSend, setRequestSend] = useState<any[]>([]);
  const [requestsFriends, setRequestsFriends] = useState<any[]>([]);
  const { setItem, getItem, removeItem } = useStorage();
  const token = getItem("token", "local");
  useEffect(() => {
    if (token) {
      me().then(() => {
        setFirstLoading(false);
      });
    } else {
      setFirstLoading(false);
    }
  }, []);
  const login = async (payload: PayloadLogin) => {
    setLoading(true);
    try {
      const res = await AuthService.login(payload);
      setItem("token", res.accessToken, "local");
      setItem("refresh_token", res.refreshToken, "local");
      await me();
    } finally {
      setLoading(false);
    }
  };
  const register = async (payload: PayloadRegister) => {
    setLoading(true);
    try {
      const res = await AuthService.register(payload);
      setItem("token", res.accessToken, "local");
      setItem("refresh_token", res.refreshToken, "local");
      await me();
    } finally {
      setLoading(false);
    }
  };
  const me = async () => {
    try {
      const res = await AuthService.me();
      setUser(res);
      setRequestSend(res?.requestSend || []);
      setRequestsFriends(res?.requestsFriends || []);
    } catch (error) {
      setUser(null);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      removeItem("token", "local");
      removeItem("refresh_token", "local");
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };
  const value = {
    loading,
    login,
    register,
    me,
    logout,
    user,
    requestSend,
    requestsFriends,
    setRequestSend,
    setRequestsFriends,
  };
  return (
    <AuthContext.Provider value={value}>
      {fistLoading && <FirstLoading />}
      {!fistLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthType;
