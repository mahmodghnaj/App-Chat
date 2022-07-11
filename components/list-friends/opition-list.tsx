import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useFriends } from "../../store/friends";

export type Props = {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  friend: any | null;
};
function OptionList({ open, anchorEl, handleClose, friend }: Props) {
  const [openDailog, setOpenDailog] = useState<boolean>(false);
  const { deleteFriend } = useFriends();
  const closeDailog = () => {
    setOpenDailog(false);
  };
  const openD = () => {
    setOpenDailog(true);
  };
  const deleteFr = () => {
    deleteFriend(friend._id).then(() => {
      closeDailog();
      handleClose();
    });
  };
  return (
    <>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "14ch",
          },
        }}
      >
        <MenuItem onClick={openD} disableRipple>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog
        open={openDailog}
        onClose={closeDailog}
        maxWidth="sm"
        aria-labelledby={"delete=frinds"}
      >
        <Box sx={{ width: "450px" }}>
          <DialogTitle>
            Delete{" "}
            {friend?.friendId?.firstName + " " + friend?.friendId?.lastName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Are You Sure ??</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={closeDailog} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={deleteFr} color="error">
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default OptionList;
