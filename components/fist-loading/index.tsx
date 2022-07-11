import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

function FirstLoading() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          zIndex: 9999,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "white",
          opacity: "0.5",
        }}
      >
        <CircularProgress size={200} />
      </Box>
    </>
  );
}

export default FirstLoading;
