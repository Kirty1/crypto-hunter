import { Snackbar, Alert } from "@mui/material";
import { CryptoState } from "../CryptoContext";

export default function AlertMessage() {
  const { alert, setAlert } = CryptoState();

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={alert.type} variant="filled">
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
