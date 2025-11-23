import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

function Banner() {
  return (
    <div
      style={{
        backgroundImage: "url(./banner2.jpg)",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 3,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontFamily: "Montserrat",
              color: "#44BBA4",
            }}
          >
            Crypto Tracker
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favorite Crypto Currency
          </Typography>
        </div>

        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
