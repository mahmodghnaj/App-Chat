import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { formatDate } from "../../helpers/format";
import { useEffect, useMemo, useState } from "react";
type Props = {
  chats: any[];
  setCurrentChat: (id: any) => void;
  loading: boolean;
  deleteChat: (id: any) => void;
};
function ListChat({ chats, setCurrentChat, loading, deleteChat }: Props) {
  const router = useRouter();
  const [filterChates, setFilterChates] = useState([...chats]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setFilterChates([...chats]);
  }, [chats]);
  const searchLoacl = (chart: any) => {
    if (!chart) {
      setFilterChates(chats);
    } else {
      const search = chats.filter((item) =>
        item.friendId.firstName.toLowerCase().includes(chart.toLowerCase())
      );
      setFilterChates(search);
    }
  };
  useEffect(() => {
    searchLoacl(search);
  }, [search]);
  return (
    <>
      <Box sx={{ display: "flex", p: 1, justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: 600 }} variant="h6">
          Chats
        </Typography>
        <Tooltip title="Add Chat">
          <Button
            onClick={() => router.push("/friends")}
            variant="contained"
            size="small"
            sx={{ bgcolor: "#616161" }}
          >
            <ChatIcon />
          </Button>
        </Tooltip>
      </Box>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
        }}
        elevation={0}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="search Chat"
          inputProps={{ "aria-label": "search chat" }}
          onChange={(val) => setSearch(val.target.value)}
          value={search}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <List
        dense
        sx={{
          mt: 2,
          pb: 8,
          position: "relative",
          overflow: "auto",
          maxHeight: "100vh",
        }}
      >
        {!loading &&
          filterChates.map((item: any) => {
            return (
              <div key={item._id}>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitle2"
                      >
                        {formatDate(item.createdAt)}
                      </Typography>
                      <IconButton
                        onClick={() => deleteChat(item._id)}
                        aria-label="delete"
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemButton
                    sx={{
                      py: 2,
                    }}
                    onClick={() => setCurrentChat(item)}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ color: "text.primary" }}
                      primary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="subtitle2"
                          >
                            {item.friendId.firstName +
                              " " +
                              item.friendId.lastName}
                          </Typography>
                        </>
                      }
                    />
                  </ListItemButton>
                  <Divider />
                </ListItem>
              </div>
            );
          })}
      </List>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
            zIndex: 9999,
            width: "100%",
            minHeight: "50vh",
            opacity: "0.5",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
    </>
  );
}

export default ListChat;
