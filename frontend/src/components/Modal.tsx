"use client";

import { useKalpApi } from "@/hooks/useKalpAPI";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const Modal = ({
  id,
  title,
  openModal,
  modalType,
  setOpenModal,
  setModalType,
  setTotalSupplyVal,
  setCurrBuyPrice,
  setCurrSellPrice,
}: {
  id: number;
  title: string;
  openModal: boolean;
  modalType: "buy" | "sell" | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<"buy" | "sell" | null>>;
  setTotalSupplyVal: React.Dispatch<React.SetStateAction<number>>;
  setCurrBuyPrice: React.Dispatch<React.SetStateAction<number>>;
  setCurrSellPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [address, setAddress] = useState<string>("");
  const { buy, sell, buyPrice, sellPrice, totalSupply, loading } =
    useKalpApi(id);
  const handleCloseModal = () => {
    setOpenModal(false);
    setAddress("");
    setModalType(null);
  };

  const metadata =
    "ipfs://bafkreidblxpobb5frd57djj43mavu2ixtbyrofqq3ieflpwavaoqq524yq";

  const handleSubmit = async () => {
    // Handle transaction logic here
    try {
      if (modalType === "buy") {
        const currBuyPrice = await buyPrice();
        await buy(
          metadata,
          address,
          parseInt(currBuyPrice.result.result.hex)
        );
      } else if (modalType === "sell") {
        await sell(address);
      }
      const tSupply = await totalSupply();
      const cBuyPrice = await buyPrice();
      const cSellPrice = await sellPrice();
      setTotalSupplyVal(Number(parseInt(tSupply.result.result.hex)));
      setCurrBuyPrice(
        Number(parseInt(cBuyPrice.result.result.hex) / Math.pow(10, 18))
      );
      setCurrSellPrice(
        Number(parseInt(cSellPrice.result.result.hex) / Math.pow(10, 18))
      );
    } catch (error) {
      console.error(error);
    }
    handleCloseModal(); // Close modal after submission
  };
  return (
    <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
      <DialogTitle>{modalType === "buy" ? `Buy ${title}` : `Sell ${title}`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={25} /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
