"use client";
import { useState } from "react";
type ContractAddressMap = {
  [key: number]: string;
};

export const useKalpApi = (tokenId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const contractAddressMap: ContractAddressMap = {
    1: "0x26F671A15c0AA1Ee7aEF08917dfD1c969B741A94",
    2: "0x20346d6431D16Bf261B08144D215A65FE83E9237",
    3: "0xaf64eF048Ff4f2ab0eE402BbAcd3cfa4c715419d",
    4: "0x1BF67B6a47D751D7fD9B659dB5e0B01745Bc8Bd1",
    5: "0x7C333E8fc38d99859a7DeC1bC72E04E425cC10aE",
    6: "0x8883535621d638da19E26E7226F85662bD5A5d1D",
    7: "0x4dd6D367EA41E57cbD0f75fC59F4F98Bba0A24A8",
    8: "0x9ec44F230793bF6C350185AbBFF4EfbA31132293",
    9: "0x60bC0d717639a192Ad25426acd8311f72998Edd5",
    10: "0x0a613542732C816992B2DD2b774C89D0BCDa9AEB",
    11: "0x80A4FD41158Dd1afF42Af684744CfeE0c0E4A8B1",
    12: "0xA440d4Fd532B009D07617F61B2502bcbaC0Cd867",
  };

  // Get contract address from tokenId
  const getContractAddress = (tokenId: number): string => {
    return contractAddressMap[tokenId] || "";
  };

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const callApi = async (endpoint: string, args: { [key: string]: any }) => {
    setError(null);
    const params = {
      network: "SEPOLIA",
      blockchain: "ETH",
      walletAddress: "0x47b7f54BE4E3dab68Cf65d98e0FC4A52815335A3",
      args: args,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey!,
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const buy = async (uri: string, user: string, amount: number) => {
    setLoading(true);
    const contractAddress = getContractAddress(tokenId);
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/evm/invoke/${contractAddress}/mint`;
    const args = {
      _uri: uri,
      _user: user,
      _amount: amount,
    };
    return callApi(endpoint, args);
  };

  const sell = async (user: string) => {
    setLoading(true);
    const contractAddress = getContractAddress(tokenId);
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/evm/invoke/${contractAddress}/burn`;
    const args = {
      _user: user,
    };
    return callApi(endpoint, args);
  };

  const totalSupply = async () => {
    const contractAddress = getContractAddress(tokenId);
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/evm/query/${contractAddress}/totalSupply`;
    const args = {};
    return callApi(endpoint, args);
  };

  const buyPrice = async () => {
    const contractAddress = getContractAddress(tokenId);
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/evm/query/${contractAddress}/Price`;
    const args = {};
    return callApi(endpoint, args);
  };

  const sellPrice = async () => {
    const contractAddress = getContractAddress(tokenId);
    const endpoint = `https://gateway-api.kalp.studio/v1/contract/evm/query/${contractAddress}/BuurnPrice`;
    const args = {};
    return callApi(endpoint, args);
  };

  return { buy, sell, totalSupply, buyPrice, sellPrice, loading, error };
};
