import React, { useState, useEffect } from "react";
import { Box, Card, TextField, Typography } from "@mui/material";
import { numberWithCommas } from "./CoinsTable";

export default function CoinCalculator({ coin }) {
  const [buyPrice, setBuyPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const livePrice = coin?.market_data?.current_price?.inr || 0;

  const investment = buyPrice && quantity ? buyPrice * quantity : 0;
  const currentValue = quantity ? livePrice * quantity : 0;
  const profitLoss = currentValue - investment;
  const roi =
    investment > 0 ? ((currentValue - investment) / investment) * 100 : 0;

  return (
    <Card
      sx={{
        background: "#121212",
        color: "white",
        p: 3,
        mt: 4,
        borderRadius: 3,
        border: "1px solid #333",
      }}
    >
      <Typography variant="h5" mb={2} sx={{ fontWeight: "bold" }}>
        Profit Calculator
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Buy Price (INR)"
          InputLabelProps={{ style: { color: "white" } }}
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
            },
          }}
        />

        <TextField
          label="Quantity"
          InputLabelProps={{ style: { color: "white" } }}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
            },
          }}
        />
      </Box>

      <Box mt={3} sx={{ lineHeight: 1.8 }}>
        <Typography variant="body1">
          Live Price: ₹{numberWithCommas(livePrice)}
        </Typography>
        <Typography variant="body1">
          Investment: ₹{numberWithCommas(investment)}
        </Typography>
        <Typography variant="body1">
          Current Value: ₹{numberWithCommas(currentValue)}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 2,
            color: profitLoss >= 0 ? "#0ECB81" : "#FF3A3A",
            fontWeight: "bold",
          }}
        >
          {profitLoss >= 0 ? "Profit" : "Loss"}: ₹
          {numberWithCommas(profitLoss.toFixed(2))}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: roi >= 0 ? "#0ECB81" : "#FF3A3A",
            fontWeight: "bold",
          }}
        >
          ROI: {roi.toFixed(2)}%
        </Typography>
      </Box>
    </Card>
  );
}
