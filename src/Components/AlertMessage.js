import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { CryptoState } from "../CryptoContext";

const AlertMessage = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.type}
        variant="filled"
        elevation={6}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
