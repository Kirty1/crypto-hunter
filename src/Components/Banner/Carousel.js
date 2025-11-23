import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        key={coin.id}
        style={{
          textDecoration: "none",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textTransform: "uppercase",
        }}
      >
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />

        <Typography variant="body1">
          {coin.symbol}&nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 500 }}
        >
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </Typography>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </Box>
  );
};

export default Carousel;
