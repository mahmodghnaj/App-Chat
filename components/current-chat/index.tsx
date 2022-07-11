import {
  Avatar,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { formatAMPM } from "../../helpers/format";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
type Props = {
  currentChat: any;
  messages: any;
  loading: boolean;
  sendMessage: (message: string) => void;
  user: any;
  hideButtonBack: boolean;
  setCurrentChat: (chat: any) => void;
};
function CurrentChat({
  currentChat,
  messages,
  loading,
  sendMessage,
  user,
  hideButtonBack,
  setCurrentChat,
}: Props) {
  const inputEl = useRef<null | any>(null);
  const messageRef = useRef<null | any>(null);
  const send = (e: any) => {
    if (e.key === "Enter") {
      sendMessage(e.target.value);
      inputEl.current.value = "";
    }
  };
  useEffect(() => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight + 50;
  }, [messages]);
  return (
    <>
      <Box sx={{ position: "relative", height: "100%" }}>
        <List>
          <ListItem>
            <ListItemAvatar sx={{ display: "flex" }}>
              {hideButtonBack && (
                <IconButton onClick={() => setCurrentChat(null)}>
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Avatar sx={{ mr: 2 }}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                currentChat.friendId.firstName +
                " " +
                currentChat.friendId.lastName
              }
            />
          </ListItem>
        </List>
        <Divider />
        <Box ref={messageRef} sx={{ height: "65vh", overflow: "auto" }}>
          {messages.map((item: any) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: `${user._id == item.sender ? "right" : ""}`,
                }}
                key={item._id}
              >
                <Box
                  sx={{
                    m: 2,
                    pr: user._id == item.sender ? 1 : 2,
                    pl: user._id == item.sender ? 5 : 1,

                    minWidth: "15px",
                    bgcolor: `${
                      user._id == item.sender ? "#3DB16B" : "#464852"
                    }`,
                    opacity: ".8",
                    textAlign: "right",
                  }}
                >
                  <Typography color={"white"}> {item.message}</Typography>
                  <Typography variant="subtitle2" color={"white"}>
                    {formatAMPM(item.createdAt)}
                  </Typography>
                </Box>
              </Box>
            );
          })}
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "center",
                zIndex: 9999,
                width: "100%",
                minHeight: "60vh",
                opacity: "0.5",
              }}
            >
              <CircularProgress size={100} />
            </Box>
          )}
        </Box>
        <Box sx={{ position: "absolute", bottom: "50px", width: "100%" }}>
          <TextField
            fullWidth
            inputRef={inputEl}
            onKeyDown={(e) => send(e)}
            label="message"
            autoFocus
          />
        </Box>
      </Box>
    </>
  );
}

export default CurrentChat;
