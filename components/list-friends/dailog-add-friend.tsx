import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  List,
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  ListItem,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useFriends } from "../../store/friends";
import { useAuth } from "../../store/auth";

export type Props = {
  open: boolean;
  colseDailog: () => void;
  setCurrentChat: (chat: any) => void;
};
function AddFriend({ open, colseDailog, setCurrentChat }: Props) {
  const [name, setName] = useState<string | null>("");
  const {
    search,
    loadingSearch,
    searchFriends,
    friends,
    addFriend,
    setSearchFriends,
  } = useFriends();
  const { requestSend } = useAuth();
  useEffect(() => {
    if (name) {
      search(name);
    }
    if (name === null) {
      search(undefined);
    }
  }, [name]);
  const close = () => {
    setName("");
    setSearchFriends([]);
    colseDailog();
  };
  const isFriend = (id: string) => {
    const listFriends = friends.map((item: any) => item.friendId._id);
    return listFriends.includes(id);
  };
  const isSend = (id: string) => {
    const listFriends = requestSend.map((item: any) => item._id);
    return listFriends.includes(id);
  };
  const startChat = (id: any) => {
    const friend = friends.find((item: any) => item.friendId._id == id);
    setCurrentChat(friend);
    colseDailog();
  };
  return (
    <>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={close}
        aria-labelledby={"add-friend"}
      >
        <Box sx={{ minWidth: "40vw" }}>
          <Box
            sx={{
              bgcolor: "#757575",
              display: "flex",
              alignItems: "center",
              py: 2,
            }}
          >
            <PersonAddIcon fontSize="large" sx={{ ml: 2, mr: 1 }} />
            <Typography variant="h6">Add Friends</Typography>
          </Box>
          <DialogContent>
            <Box sx={{ mx: 2 }}>
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                elevation={2}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="search Friend"
                  value={name}
                  inputProps={{ "aria-label": "search friend" }}
                  onChange={(val: any) =>
                    setName(val.target.value ? val.target.value : null)
                  }
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
            <Box sx={{ height: "30vh" }}>
              <List
                dense
                sx={{
                  mt: 1,
                  pb: 1,
                  position: "relative",
                  overflow: "auto",
                  maxHeight: "30vh",
                }}
              >
                {!loadingSearch &&
                  searchFriends.map((item: any) => {
                    return (
                      <div key={item._id}>
                        <ListItem
                          secondaryAction={
                            isSend(item._id) ? (
                              <Button disabled variant="outlined">
                                Sended
                              </Button>
                            ) : !isFriend(item._id) ? (
                              <Button
                                onClick={() => addFriend(item._id)}
                                variant="contained"
                              >
                                Add Friend
                              </Button>
                            ) : (
                              <Button
                                onClick={() => startChat(item._id)}
                                variant="outlined"
                              >
                                Message
                              </Button>
                            )
                          }
                          sx={{ py: 2 }}
                        >
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" />
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ color: "text.primary" }}
                            secondary={
                              <>
                                <Typography variant="subtitle1">
                                  {item.email}
                                </Typography>
                              </>
                            }
                            primary={
                              <>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="subtitle2"
                                >
                                  {item.firstName + " " + item.lastName}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
              </List>
              {loadingSearch && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                    zIndex: 9999,
                    width: "100%",
                    minHeight: "20vh",
                    opacity: "0.5",
                  }}
                >
                  <CircularProgress size={100} />
                </Box>
              )}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={colseDailog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default AddFriend;
