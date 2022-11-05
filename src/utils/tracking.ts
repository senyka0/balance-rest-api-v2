import * as dotenv from "dotenv";
import path from "path";
import { addresses } from "./config";
import fs from "fs";
import { getEthBalance } from "./getEthBalance";
import { getTokens } from "./getTokens";
import { makeCall } from "./getERC20Balances";
import { Token } from "./interfaces";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const start = () => {
  const id = setInterval(async () => {
    for (const address of addresses) {
      const ethBalance = await getEthBalance(address);
      const tokens = await getTokens();
      const balances = await makeCall(tokens as Token[], address);
      fs.writeFileSync(`${__dirname}/../../logs/${address}.json`, JSON.stringify({ time: new Date(), address: address, ethBalance: ethBalance, erc20Balances: balances }));
    }
  }, 1000 * 60);
  return id;
};
