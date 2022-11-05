import { getEthBalance } from "./../utils/getEthBalance";
import { FetchError } from "./../utils/interfaces";
import { Request, Response } from "express";
import { Token } from "../utils/interfaces";
import { getTokens } from "../utils/getTokens";
import { makeCall } from "../utils/getERC20Balances";

export const getBalance = async (req: Request, res: Response) => {
  const ethBalance = await getEthBalance(req.params.address);
  if ((ethBalance as FetchError).error) return res.status(500).json(ethBalance);
  const tokens = await getTokens();
  if ((tokens as FetchError).error) return res.status(500).json(tokens);
  const balances = await makeCall(tokens as Token[], req.params.address);
  if ((balances as FetchError).error) return res.status(500).json(balances);
  res.status(200).json({ address: req.params.address, ethBalance: ethBalance, erc20Balances: balances });
};
