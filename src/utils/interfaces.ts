export interface Token {
  symbol: string;
  name: string;
  address: string;
}
export interface TokenBalance {
  symbol: string;
  name: string;
  address: string;
  balance: number;
  decimals: number;
}
export interface AxiosReq {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  slug: string;
  is_active: number;
  first_historical_data: string;
  last_historical_data: string;
  platform?: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  };
}
export interface FetchError {
  error: string;
}
