import { ChangeEvent, ReactElement, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Register from "../components/layouts/register";
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
}));
const Page = () => {
  const router = useRouter();
  const { register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorLogin, setError] = useState(false);
  const registerUser = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    register({
      firstName: firstName,
      lastName: lastName,
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
          Email Already have !!!
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
                onSubmit={(val: any) => registerUser(val)}
              >
                <Typography textAlign={"center"} variant="h6">
                  Create account
                </Typography>
                <Stack spacing={2} direction="row">
                  <TextField
                    id="firstName"
                    color="success"
                    value={firstName}
                    onChange={(val: ChangeEvent<HTMLInputElement>) =>
                      setFirstName(val.currentTarget.value)
                    }
                    type="text"
                    placeholder="First Name"
                    required={true}
                  />

                  <TextField
                    id="lastName"
                    color="success"
                    value={lastName}
                    onChange={(val: ChangeEvent<HTMLInputElement>) =>
                      setLastName(val.currentTarget.value)
                    }
                    type="text"
                    placeholder="Last Name"
                    required={true}
                  />
                </Stack>
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
                  inputProps={{
                    pattern: ".{8,}",
                    title: "Must contain  more 8 characters",
                  }}
                />
                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="contained"
                  size="large"
                  color="success"
                >
                  Sigin Up
                </LoadingButton>
                <Divider sx={{ pt: 2 }} variant="middle" />
                <Typography textAlign={"center"} variant="body1">
                  Already have an account?
                  <br />
                  <Button
                    variant="outlined"
                    size="small"
                    color="inherit"
                    sx={{ width: "150px", mt: 2 }}
                    onClick={() => router.push("/login")}
                  >
                    Sigin In!
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
  return <Register>{page}</Register>;
};
export default Page;
