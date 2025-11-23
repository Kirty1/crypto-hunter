import React, { useState } from "react";
import {
  Drawer,
  Avatar,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = useState({ right: false });
  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful!",
    });
    toggleDrawer("right", false)();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              ml: 2,
              cursor: "pointer",
              bgcolor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              sx={{
                width: 350,
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  height: "92%",
                }}
              >
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                  sx={{
                    width: 200,
                    height: 200,
                    cursor: "pointer",
                    bgcolor: "#EEBC1D",
                  }}
                />
                <Typography
                  sx={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                    bgcolor: "grey.300",
                    borderRadius: 1,
                    p: 2,
                    pt: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    overflowY: "auto",
                  }}
                >
                  <Typography sx={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </Typography>
                  {coins.map((coin) =>
                    watchlist.includes(coin.id) ? (
                      <Box
                        key={coin.id}
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          color: "black",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          bgcolor: "#EEBC1D",
                          boxShadow: 1,
                        }}
                      >
                        <span>{coin.name}</span>
                        <span style={{ display: "flex", gap: 8 }}>
                          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                          <AiFillDelete
                            style={{ cursor: "pointer" }}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </span>
                      </Box>
                    ) : null
                  )}
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={logOut}
                sx={{ height: 40, width: "100%", mt: 2, bgcolor: "#EEBC1D" }}
              >
                Log Out
              </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
