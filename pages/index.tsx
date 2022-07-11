import type { NextPage } from "next";
import styled from "@emotion/styled";
import { Paper, Grid, Box } from "@mui/material";
import { useChats } from "../store/chats";
import ListChat from "../components/list-chat";
import { useEffect } from "react";
import CurrentChat from "../components/current-chat";
import { useSoket } from "../store/socket";
import { useAuth } from "../store/auth";
import { useMessage } from "../store/messages";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: "100vh",
}));
const Home: NextPage = () => {
  const { chats, loading, getChats, setCurrentChat, currentChat, deleteChat } =
    useChats();
  const messages = useMessage();
  const { user } = useAuth();
  useEffect(() => {
    if (!chats.length) {
      getChats();
    }
  }, []);
  const { socket } = useSoket();

  const sendMessage = (message: string) => {
    socket.emit("mesToserver", {
      chatId: currentChat._id,
      message: message,
    });
  };
  const theme: any = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Head>
        <title>My Chats</title>
        <link rel="shortcut icon" href="/chat.png" />
      </Head>
      <Box>
        <Grid container spacing={2}>
          {!matches ? (
            <>
              {!currentChat ? (
                <Grid sx={{ flexGrow: 1 }} item>
                  <Item>
                    <ListChat
                      chats={chats}
                      loading={loading}
                      setCurrentChat={setCurrentChat}
                      deleteChat={deleteChat}
                    />
                  </Item>
                </Grid>
              ) : (
                <></>
              )}
            </>
          ) : (
            <Grid sx={{ flexGrow: 1 }} item>
              <Item>
                <ListChat
                  chats={chats}
                  loading={loading}
                  setCurrentChat={setCurrentChat}
                  deleteChat={deleteChat}
                />
              </Item>
            </Grid>
          )}

          <Grid sx={{ flexGrow: 100 }} item>
            <Item>
              {currentChat && (
                <CurrentChat
                  loading={messages.loading}
                  currentChat={currentChat}
                  messages={messages.messages}
                  sendMessage={sendMessage}
                  user={user}
                  hideButtonBack={!matches}
                  setCurrentChat={setCurrentChat}
                />
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
