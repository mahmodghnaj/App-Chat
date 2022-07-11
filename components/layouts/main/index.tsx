import { CssBaseline } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../../../store/auth";
import { ChatsProvider } from "../../../store/chats";
import NavBar from "../../navbar";
import { Box } from "@mui/material";
import { SocketProvider } from "../../../store/socket";

export type MainProps = {
  children: ReactNode;
};
function Main({ children }: MainProps) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  });
  return (
    <>
      {user && (
        <>
          <SocketProvider>
            <ChatsProvider>
              <CssBaseline enableColorScheme />
              <Box sx={{ display: "flex" }}>
                <NavBar />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    overflow: "hidden",
                    maxHeight: "calc(100vh - 24px)",
                  }}
                >
                  {children}
                </Box>
              </Box>
            </ChatsProvider>
          </SocketProvider>
        </>
      )}
    </>
  );
}

export default Main;
