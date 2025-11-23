import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency, user } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>

            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                flex: 1,
                color: "#44BBA4",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Crypto Tracker
            </Typography>

            <Select
              variant="outlined"
             value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                width: 100,
                height: 40,
                ml: 2,
                color: "white",
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
