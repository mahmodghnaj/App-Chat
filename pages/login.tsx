import { ChangeEvent, ReactElement, useState } from "react";
import Login from "../components/layouts/login";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "../store/auth";
import styled from "@emotion/styled";
import Head from "next/head";

const Root = styled("div")(({ theme }: any) => ({
  [theme.breakpoints.up("md")]: {
    width: "40vw",
  },
  [theme.breakpoints.down("md")]: {
    width: "60vw",
  },
}));
const Page = () => {
  const router = useRouter();
  const { login, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setError] = useState(false);
  const loginUser = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    login({
      email: email,
      password: password,
    })
      .then((_) => {
        router.push("/");
      })
      .catch((_) => {
        setError(true);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="shortcut icon" href="/chat.png" />
      </Head>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errorLogin}
        key={"top" + "center"}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Email Or Password valid
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundImage: `url(${"bg1.png"})`,
          height: "100vh",
          backgroundColor: "black",
          backgroundRepeat: "no-repeat",
          opacity: "0.9",
          backgroundPosition: "",
          backgroundSize: "100% 100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Root>
          <Card
            sx={{
              minHeight: "50vh",
            }}
          >
            <CardContent
              sx={{
                px: 8,
              }}
            >
              <Stack
                component="form"
                sx={{ mt: 8 }}
                spacing={2}
                onSubmit={(val: any) => loginUser(val)}
              >
                <Typography textAlign={"center"} variant="h6">
                  Sign in
                </Typography>

                <TextField
                  id="email"
                  color="success"
                  value={email}
                  onChange={(val: ChangeEvent<HTMLInputElement>) =>
                    setEmail(val.currentTarget.value)
                  }
                  type="email"
                  placeholder="Email"
                  required={true}
                />
                <TextField
                  id="password"
                  color="success"
                  onChange={(val: ChangeEvent<HTMLInputElement>) =>
                    setPassword(val.currentTarget.value)
                  }
                  placeholder="password"
                  value={password}
                  type={"password"}
                  required={true}
                />
                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="contained"
                  size="large"
                  color="success"
                >
                  Sigin In
                </LoadingButton>
                <Divider sx={{ pt: 2 }} variant="middle" />
                <Typography textAlign={"center"} variant="body1">
                  Don &rsquo; t have an account?
                  <br />
                  <Button
                    variant="outlined"
                    size="small"
                    color="inherit"
                    sx={{ width: "150px", mt: 2 }}
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </Button>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Root>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Login>{page}</Login>;
};
export default Page;
