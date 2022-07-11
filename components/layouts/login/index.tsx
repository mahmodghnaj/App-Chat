import { CssBaseline } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../../../store/auth";
export type LoginProps = {
  children: ReactNode;
};
function Login({ children }: LoginProps) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  });
  return (
    <div>
      <CssBaseline />
      {!user && children}
    </div>
  );
}

export default Login;
