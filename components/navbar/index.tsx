import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Box,
  Paper,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSettings } from "../../store/settings";
import { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import MailIcon from "@mui/icons-material/Mail";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useAuth } from "../../store/auth";
import { useRouter } from "next/router";
import Notifications from "../notifications";

function NavBar() {
  const { changeTheme, defaultTheme } = useSettings();
  const [openDailogNon, setOpenDailogNon] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const [firstItem, setFisrtItem] = useState([
    {
      label: "Chats",
      icon: <MailIcon sx={{ fontSize: "30px" }} />,
      handle: () => {
        router.push("/");
      },
    },
    {
      label: "Frindes",
      icon: <PeopleIcon sx={{ fontSize: "30px" }} />,
      handle: () => {
        router.push("/friends");
      },
    },
  ]);
  const [lastItem, setLastItem] = useState([
    {
      label: "Notifications",
      icon: <NotificationsActiveIcon sx={{ fontSize: "30px" }} />,
      handle: () => {
        setOpenDailogNon(true);
      },
    },
    {
      label: "Logout",
      icon: <PowerSettingsNewIcon sx={{ fontSize: "30px" }} />,
      handle: () => {
        logout().then((_) => {
          router.push("/login");
        });
      },
    },
  ]);
  const [currentPath, setCurrentPath] = useState("/");
  useEffect(() => {
    if (router.pathname.includes("friends")) {
      setCurrentPath("Frindes");
    } else {
      setCurrentPath("Chats");
    }
  }, [router]);
  return (
    <>
      <Drawer
        sx={{ width: "65px" }}
        variant="persistent"
        anchor={"left"}
        open={true}
      >
        <Paper
          elevation={24}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "space-between",
          }}
        >
          <List component="nav">
            {firstItem.map((item) => {
              return (
                <ListItem
                  key={item.label}
                  sx={{
                    pl: "0px",
                    pr: "0px",
                  }}
                >
                  <Tooltip title={item.label} placement="left">
                    <ListItemButton
                      selected={currentPath == item.label}
                      onClick={() => item.handle()}
                    >
                      {item.icon}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
          <List sx={{ alignSelf: "end" }} component="nav">
            <ListItem
              sx={{
                pl: "0px",
                pr: "0px",
              }}
            >
              <ListItemButton
                onClick={() =>
                  changeTheme(defaultTheme == "light" ? "dark" : "light")
                }
              >
                {defaultTheme == "light" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </ListItemButton>
            </ListItem>
            {lastItem.map((item) => {
              return (
                <ListItem
                  key={item.label}
                  sx={{
                    pl: "0px",
                    pr: "0px",
                  }}
                >
                  <Tooltip title={item.label} placement="left">
                    <ListItemButton onClick={() => item.handle()}>
                      {item.icon}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Drawer>
      <Notifications
        openDailog={openDailogNon}
        setOpenDailog={() => setOpenDailogNon(false)}
      />
    </>
  );
}

export default NavBar;
