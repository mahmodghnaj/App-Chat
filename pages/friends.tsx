import type { NextPage } from "next";
import styled from "@emotion/styled";
import { Paper, Grid, useMediaQuery } from "@mui/material";
import { useChats } from "../store/chats";
import CurrentChat from "../components/current-chat";
import { useSoket } from "../store/socket";
import { useAuth } from "../store/auth";
import ListFriends from "../components/list-friends";
import { useMessage } from "../store/messages";
import { useFriends } from "../store/friends";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import Head from "next/head";

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: "100vh",
}));

const Home: NextPage = () => {
  const messages = useMessage();
  const { user } = useAuth();
  const { socket } = useSoket();
  const friends = useFriends();
  const chats = useChats();
  useEffect(() => {
    if (!friends.friends.length) {
      friends.getFriends();
    }
    if (!chats.chats.length) {
      chats.getChats();
    }
  }, []);
  const sendMessage = (message: string) => {
    if (chats.currentChat.isFoundChat) {
      socket.emit("mesToserver", {
        chatId: chats.currentChat._id,
        message: message,
      });
    } else {
      chats.addChat().then((re) => {
        socket.emit("mesToserver", {
          chatId: re._id,
          message: message,
        });
      });
    }
  };
  const theme: any = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Head>
        <title>My Friends</title>
        <link rel="shortcut icon" href="/chat.png" />
      </Head>
      <Grid container spacing={2}>
        <Grid sx={{ flexGrow: 1 }} item>
          {!matches ? (
            <>
              {!chats.currentChat ? (
                <Grid sx={{ flexGrow: 1 }} item>
                  <Item>
                    <ListFriends
                      setCurrentChat={chats.setCurrentChat}
                      friends={friends.friends}
                      loading={friends.loading}
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
                <ListFriends
                  setCurrentChat={chats.setCurrentChat}
                  friends={friends.friends}
                  loading={friends.loading}
                />
              </Item>
            </Grid>
          )}
        </Grid>
        <Grid sx={{ flexGrow: 100 }} item>
          <Item>
            {chats.currentChat && (
              <CurrentChat
                loading={messages.loading}
                currentChat={chats.currentChat}
                messages={messages.messages}
                sendMessage={sendMessage}
                user={user}
                hideButtonBack={!matches}
                setCurrentChat={chats.setCurrentChat}
              />
            )}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
