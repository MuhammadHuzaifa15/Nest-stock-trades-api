export interface IGetByStockSymbol {
  symbol: string;
  start?: string | Date;
  end?: string | Date;
}

export interface IGetStats {
  start?: string | Date;
  end?: string | Date;
}
