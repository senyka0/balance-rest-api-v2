import axios from "axios";
import { Token, FetchError, AxiosReq } from "./interfaces";

export const getTokens = async (): Promise<Token[] | FetchError> => {
  try {
    const tokens: Token[] = await axios
      .get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank", {
        headers: {
          "content-type": "application/json",
          "X-CMC_PRO_API_KEY": "YOUR_COINMARKETCAP_API_KEY",
        },
      })
      .then((res) => res.data.data.filter((token: AxiosReq) => token.platform?.slug === "ethereum" && token.platform!.token_address.length === 42))
      .then((res) =>
        res.map((token: AxiosReq) => {
          return { symbol: token.symbol, name: token.name, address: token.platform?.token_address };
        })
      );
    return tokens;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return { error: e.message };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};
