import {
  Button,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import CoinInfo from "../Components/CoinsInfo";

import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../Components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);

  // 🔥 FIXED — Calculator states INSIDE component
  const [amount, setAmount] = useState("");
  const [calculatedValue, setCalculatedValue] = useState("");

  const { currency, symbol, user, setAlert, watchlist } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin:", error);
    }
  };

  useEffect(() => {
    if (id) fetchCoin();
  }, [id]);

  if (!coin || !coin.market_data) {
    return <LinearProgress sx={{ backgroundColor: "gold" }} />;
  }

  const inWatchlist = Boolean(
    watchlist && coin && watchlist.includes(coin.id)
  );

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        { coins: [...watchlist, coin.id] },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} added to Watchlist!`,
        type: "success",
      });
    } catch (e) {
      setAlert({
        open: true,
        message: e.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((w) => w !== coin.id) },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} removed from Watchlist!`,
        type: "success",
      });
    } catch (e) {
      setAlert({
        open: true,
        message: e.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          borderRight: { md: "2px solid grey" },
          px: 2,
        }}
      >
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          {coin.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            textAlign: "justify",
            px: 2,
          }}
        >
          {parse(coin.description.en.split(". ")[0] || "")}
        </Typography>

        {/* Market Data */}
        <Box sx={{ width: "100%", mt: 3, px: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Rank: {numberWithCommas(coin.market_cap_rank)}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
            Current Price:{" "}
            <strong>
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </strong>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
            Market Cap:{" "}
            <strong>
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </strong>
          </Typography>

          {/* Crypto Calculator */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              border: "1px solid grey",
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Crypto Calculator
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              Enter amount in {currency.toUpperCase()}:
            </Typography>

            <input
              type="number"
              placeholder={`Amount in ${currency}`}
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                setAmount(val);

                if (!val) return setCalculatedValue("");

                const price =
                  coin.market_data.current_price[currency.toLowerCase()];

                const cryptoAmount = val / price;
                setCalculatedValue(cryptoAmount.toFixed(6));
              }}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />

            {calculatedValue && (
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                You will get:{" "}
                {calculatedValue} {coin.symbol.toUpperCase()}
              </Typography>
            )}
          </Box>

          {/* Watchlist Button */}
          {user && (
            <Button
              variant="contained"
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
              sx={{
                width: "100%",
                mt: 3,
                backgroundColor: inWatchlist ? "red" : "gold",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: inWatchlist ? "#cc0000" : "#d4a017",
                },
              }}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </Box>
      </Box>

      {/* Chart Section */}
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
