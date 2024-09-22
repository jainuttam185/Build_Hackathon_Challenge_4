import { useKalpApi } from "@/hooks/useKalpAPI";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const Modal = ({
  openModal,
  modalType,
  metadata,
  setOpenModal,
  setModalType,
}: {
  openModal: boolean;
  modalType: "buy" | "sell" | null;
  metadata: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<"buy" | "sell" | null>>;
}) => {
  const [address, setAddress] = useState<string>("");
  const { buy, sell, buyPrice } = useKalpApi();
  const handleCloseModal = () => {
    setOpenModal(false);
    setAddress("");
    setModalType(null);
  };

  const handleSubmit = async () => {
    // Handle transaction logic here
    try {
      if (modalType === "buy") {
        const currBuyPrice = await buyPrice();
        const data = await buy(metadata, address, currBuyPrice);
      } else if (modalType === "sell") {
        const data = await sell(address);
      }
    } catch (error) {
      console.error(error);
    }
    handleCloseModal(); // Close modal after submission
  };
  return (
    <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
      <DialogTitle>{modalType === "buy" ? "Buy NFT" : "Sell NFT"}</DialogTitle>
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
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
