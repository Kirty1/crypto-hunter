import { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Tab,
  Tabs,
  AppBar,
  Box,
  Paper,
} from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const { setAlert } = CryptoState();
  const googleProvider = new GoogleAuthProvider();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => setValue(newValue);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: 85,
          height: 40,
          ml: 2,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Paper
            sx={{
              width: 400,
              bgcolor: "background.paper",
              color: "white",
              borderRadius: 2,
              mx: "auto",
              my: "10%",
              p: 2,
            }}
          >
            <AppBar
              position="static"
              sx={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                sx={{ borderRadius: 1 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>

            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 3,
                textAlign: "center",
              }}
            >
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
