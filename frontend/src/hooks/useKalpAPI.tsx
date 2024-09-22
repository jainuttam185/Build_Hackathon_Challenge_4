"use client";
import { useState } from "react";

export const useKalpApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const callApi = async (endpoint: string, args: { [key: string]: any }) => {
    setError(null);
    const params = {
      network: "SEPOLIA",
      blockchain: "ETH",
      walletAddress: "0x8218fb27E7b5f9dDBe343FF551AC0f56647CC901",
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
    const endpoint =
      "https://gateway-api.kalp.studio/v1/contract/evm/invoke/0x17a49c41cbeB0E0994a817A0166b545dcE82C541/mint";
    const args = {
      _uri: uri,
      _user: user,
      _amount: amount,
    };
    return callApi(endpoint, args);
  };

  const sell = async (user: string) => {
    setLoading(true);
    const endpoint =
      "https://gateway-api.kalp.studio/v1/contract/evm/invoke/0x17a49c41cbeB0E0994a817A0166b545dcE82C541/burn";
    const args = {
      _user: user,
    };
    return callApi(endpoint, args);
  };

  const totalSupply = async () => {
    const endpoint =
      "https://gateway-api.kalp.studio/v1/contract/evm/query/0x17a49c41cbeB0E0994a817A0166b545dcE82C541/totalSupply";
    const args = {};
    return callApi(endpoint, args);
  };

  const buyPrice = async () => {
    const endpoint =
      "https://gateway-api.kalp.studio/v1/contract/evm/query/0x17a49c41cbeB0E0994a817A0166b545dcE82C541/Price";
    const args = {};
    return callApi(endpoint, args);
  };

  const sellPrice = async () => {
    const endpoint =
      "https://gateway-api.kalp.studio/v1/contract/evm/query/0x17a49c41cbeB0E0994a817A0166b545dcE82C541/BuurnPrice";
    const args = {};
    return callApi(endpoint, args);
  };

  return { buy, sell, totalSupply, buyPrice, sellPrice, loading, error };
};
