import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { useAuth } from "../../store/auth";
import { useFriends } from "../../store/friends";

export type Props = {
  setOpenDailog: () => void;
  openDailog: boolean;
};
function Notifications({ setOpenDailog, openDailog }: Props) {
  const { requestsFriends } = useAuth();
  const { refusalFriend, acceptFriend } = useFriends();
  return (
    <>
      <Dialog
        open={openDailog}
        onClose={setOpenDailog}
        aria-labelledby={"notifications"}
        maxWidth="md"
      >
        <Box sx={{ minWidth: "80vh", height: "60vh" }}>
          <Box
            sx={{
              bgcolor: "#757575",
              display: "flex",
              alignItems: "center",
              py: 2,
              px: 1,
            }}
          >
            <Typography variant="h6">Friend Requests</Typography>
          </Box>
          <Box sx={{ height: "39vh" }}>
            <List
              dense
              sx={{
                mt: 1,
                pb: 1,
                position: "relative",
                overflow: "auto",
                maxHeight: "35vh",
              }}
            >
              {requestsFriends.map((item: any) => {
                return (
                  <>
                    <ListItem
                      key={item._id}
                      secondaryAction={
                        <Stack spacing={2} direction="row">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => acceptFriend(item)}
                          >
                            Accepet
                          </Button>
                          <Button
                            onClick={() => refusalFriend(item)}
                            size="small"
                            variant="outlined"
                            color="error"
                          >
                            Delete
                          </Button>
                        </Stack>
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
                  </>
                );
              })}
            </List>
          </Box>
          <DialogActions>
            <Button onClick={setOpenDailog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default Notifications;
