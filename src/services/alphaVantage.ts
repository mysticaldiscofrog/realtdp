const API_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query?";

export async function getStockData(symbol: string) {
  const response = await fetch(`${BASE_URL}function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }
  return response.json();
}

export async function getForexData(from_currency: string, to_currency: string) {
  const response = await fetch(`${BASE_URL}function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch forex data");
  }
  return response.json();
}

export async function getCryptoData(symbol: string, market: string = "USD") {
    const response = await fetch(`${BASE_URL}function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=${market}&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch crypto data");
    }
    return response.json();
  }
