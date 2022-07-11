import {
  Box,
  Typography,
  Tooltip,
  Button,
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  List,
  ListItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import OptionList from "./opition-list";
import DailogAddFriends from "./dailog-add-friend";
export type Props = {
  loading: boolean;
  friends: any[];
  setCurrentChat: (item: any) => void;
};
function ListFriends({ loading, friends, setCurrentChat }: Props) {
  const [friend, setFriend] = useState(null);
  const [filterFriends, setFilterFriends] = useState([...friends]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");

  const open = Boolean(anchorEl);
  const [openDailogAdd, setOpenDailogAdd] = useState<boolean>(false);
  useEffect(() => {
    setFilterFriends([...friends]);
  }, [friends]);
  const searchLoacl = (chart: any) => {
    if (!chart) {
      setFilterFriends(friends);
    } else {
      const search = friends.filter((item) =>
        item.friendId.firstName.toLowerCase().includes(chart.toLowerCase())
      );
      setFilterFriends(search);
    }
  };
  useEffect(() => {
    searchLoacl(search);
  }, [search]);
  const handleClick = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setFriend(item);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setFriend(null);
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: 600 }} variant="h6">
          Frinds
        </Typography>
        <Tooltip title="Add Frind">
          <Button
            onClick={() => setOpenDailogAdd(true)}
            variant="contained"
            size="small"
            sx={{ bgcolor: "#616161" }}
          >
            <AddIcon />
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
          placeholder="search Friend"
          inputProps={{ "aria-label": "search friend" }}
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
          filterFriends.map((item: any) => {
            return (
              <div key={item._id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, item)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    sx={{ py: 2 }}
                    onClick={() => setCurrentChat(item)}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        item.friendId.firstName + " " + item.friendId.lastName
                      }
                    />
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="subtitle2"
                    ></Typography>
                  </ListItemButton>
                </ListItem>
                <Divider />
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
      <OptionList
        friend={friend}
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
      <DailogAddFriends
        open={openDailogAdd}
        colseDailog={() => setOpenDailogAdd(false)}
        setCurrentChat={setCurrentChat}
      />
    </>
  );
}

export default ListFriends;
