"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Pagination,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid2,
} from "@mui/material";
import { useKalpApi } from "@/hooks/useKalpAPI";
import Cards from "@/components/Cards";

// Define the type for an NFT
interface NFT {
  id: number;
  title: string;
  totalSupply: number;
  image: string;
}

// Dummy NFT Data
const nftData: NFT[] = [
  {
    id: 1,
    title: "NFT 1",
    totalSupply: 100,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "NFT 2",
    totalSupply: 80,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "NFT 3",
    totalSupply: 50,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "NFT 4",
    totalSupply: 20,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "NFT 5",
    totalSupply: 60,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "NFT 6",
    totalSupply: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    title: "NFT 7",
    totalSupply: 90,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    title: "NFT 8",
    totalSupply: 40,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    title: "NFT 9",
    totalSupply: 30,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    title: "NFT 10",
    totalSupply: 110,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 11,
    title: "NFT 11",
    totalSupply: 70,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 12,
    title: "NFT 12",
    totalSupply: 15,
    image: "https://via.placeholder.com/150",
  },
];

const NFTsPerPage = 9;

export default function HomePage() {
  const [page, setPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"buy" | "sell" | null>(null);
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { buy, sell, totalSupply, buyPrice, sellPrice, loading } = useKalpApi();

  const paginatedNFTs: NFT[] = nftData.slice(
    (page - 1) * NFTsPerPage,
    page * NFTsPerPage
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Explore & Trade Digital Artworks in Our NFT Marketplace
      </Typography>

      <Grid2 container spacing={3}>
        {paginatedNFTs.map((nft) => (
          <Grid2 key={nft.id} size={{ xs: 12, md: 4, lg: 4 }}>
            <Cards nft={nft} />
          </Grid2>
        ))}
      </Grid2>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(nftData.length / NFTsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Container>
  );
}
