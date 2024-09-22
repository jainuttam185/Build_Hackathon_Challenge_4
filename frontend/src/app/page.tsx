"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Pagination,
  Box,
  Grid2,
  Icon,
} from "@mui/material";
import Cards from "@/components/Cards";



// Define the type for an NFT
interface NFT {
  id: number;
  title: string;
  image: string;
}

// Dummy NFT Data
const nftData: NFT[] = [
  {
    id: 1,
    title: "Iron Man",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8654427-ezgif-1-2f113089e4.jpg",
  },
  {
    id: 2,
    title: "Thor",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/11139/111399535/9140994-20231020_153307~3.jpg",
  },
  {
    id: 3,
    title: "Hank Pym",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/9213988-rco023_1703686783.jpg",
  },
  {
    id: 4,
    title: "Wasp",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/10/100647/6039335-wasp.jpg",
  },
  {
    id: 5,
    title: "Hulk",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/9174497-21.jpeg",
  },
  {
    id: 6,
    title: "Captain America",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8459983-rco031_1650495781.jpg",
  },
  {
    id: 7,
    title: "Hawkeye",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/11156/111564182/9384867-thunderbolts_vol_4_1_trading_card_variant_textless.jpg",
  },
  {
    id: 8,
    title: "QuickSilver",  
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/9250882-ezgif-1-9183cabfe6.jpg",
  },
  {
    id: 9,
    title: "Scarlet Witch",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/11174/111743204/9364864-scarletwitch%235joshuaswaby.jpg",
  },
  {
    id: 10,
    title: "Swordsman",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/11/117763/2310795-swordsman.jpg",
  },
  {
    id: 11,
    title: "Hercules",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/7817301-hercules_%28earth-616%29_from_avengers_no_road_home_vol_1_10_001.jpg",
  },
  {
    id: 12,
    title: "Black Panther",
    image: "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8251800-black_panther_vol_8_1_devil_dog_comics_and_jolzar_collectibles_exclusive_virgin_variant.jpg",
  },
];

const NFTsPerPage = 9;

export default function HomePage() {
  const [page, setPage] = useState<number>(1);

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
      <Typography
        variant="h3"
        color="#283A46"
        sx={{
          textAlign: "center",
          pt: "70px",
          mb: 8,
          fontWeight: 500,
          fontFamily: "Readex Pro",
          fontSize: 70,
        }}
      >
        AVENGERS - NFT - MARETPLACE
      </Typography>

      <Grid2 container spacing={3}>
        {paginatedNFTs.map((nft) => (
          <Grid2 key={nft.id} size={{ xs: 12, md: 4, lg: 4 }}>
            <Cards nft={nft} />
          </Grid2>
        ))}
      </Grid2>

      <Box display="flex" justifyContent="center" mt={4} mb={12}>
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
