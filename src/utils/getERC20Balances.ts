import { Token, TokenBalance, FetchError } from "./interfaces";
import { Multicall, ContractCallResults, ContractCallContext } from "ethereum-multicall";
import Web3 from "web3";
import { resolve } from "path";
import * as dotenv from "dotenv";
import tokenAbi from "./tokenAbi.json";

dotenv.config({ path: resolve(__dirname, "../../.env") });
const web3 = new Web3((process.env.INFURA_KEY as string) || "https://mainnet.infura.io/v3/");
const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

export const makeCall = async (tokens: Token[], address: string): Promise<TokenBalance[] | FetchError> => {
  try {
    const contractCallContext: ContractCallContext[] = tokens.slice(0, 1000).map((token: Token) => {
      return {
        reference: token.address,
        contractAddress: token.address,
        abi: tokenAbi,
        calls: [
          { reference: "balanceOf", methodName: "balanceOf", methodParameters: [address] },
          { reference: "decimals", methodName: "decimals", methodParameters: [] },
        ],
      };
    });
    const results: ContractCallResults = await multicall.call(contractCallContext);
    const res = tokens
      .slice(0, 1000)
      .filter((token) => results.results[token.address].callsReturnContext[0].success === true)
      .map((token: Token) => {
        return {
          symbol: token.symbol,
          name: token.name,
          address: token.address,
          balance: parseInt(results.results[token.address].callsReturnContext[0].returnValues[0].hex.toString()),
          decimals: results.results[token.address].callsReturnContext[1].returnValues[0],
        };
      })
      .filter((token) => token.balance > 0);
    return res;
  } catch (e) {
    console.log(e);
    return { error: (e as Error).message };
  }
};
