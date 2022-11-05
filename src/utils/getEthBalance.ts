import { FetchError } from "./interfaces";
import Web3 from "web3";
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "../../.env") });

const web3 = new Web3((process.env.INFURA_KEY as string) || "https://mainnet.infura.io/v3/");

export const getEthBalance = async (userAddress: string): Promise<number | FetchError> => {
  try {
    const balance: number = parseInt(await web3.eth.getBalance(userAddress));
    return balance;
  } catch (e) {
    return { error: (e as Error).message };
  }
};
