import { useKalpApi } from "@/hooks/useKalpAPI";
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Cards = ({
  nft,
}: {
  nft: {
    id: number;
    title: string;
    totalSupply: number;
    image: string;
  };
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"buy" | "sell" | null>(null);
  const [totalSupplyVal, setTotalSupplyVal] = useState<number>(0);
  const [currBuyPrice, setCurrBuyPrice] = useState<number>(0);
  const [currSellPrice, setCurrSellPrice] = useState<number>(0);
  const { buy, sell, totalSupply, buyPrice, sellPrice, loading } = useKalpApi();

  const handleOpenModal = (type: "buy" | "sell") => {
    setModalType(type);
    setOpenModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      const tSupply = await totalSupply();
      console.log(parseInt(tSupply.result.result.hex, 10))
      const cBuyPrice = await buyPrice();
      const cSellPrice = await sellPrice();
      setTotalSupplyVal(Number(Number(tSupply.result.result) / Math.pow(10, 18)));
      setCurrBuyPrice(Number(Number(cBuyPrice.result.result) / Math.pow(10, 18)));
      setCurrSellPrice(Number(Number(cSellPrice.result.result) / Math.pow(10, 18)));
    };
    getData();
  }, [totalSupplyVal, currBuyPrice, currSellPrice]);

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={nft.image}
        alt={nft.title}
      />
      <CardContent>
        <Typography variant="h6">{nft.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Total Supply: {totalSupplyVal}
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginRight: 1 }}
            onClick={() => handleOpenModal("buy")}
          >
            Buy
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleOpenModal("sell")}
          >
            Sell
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Cards;
