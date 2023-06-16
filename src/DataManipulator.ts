import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const PriceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2
    const PriceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2
    const ratio = PriceABC / PriceDEF
    const upperBound = 1+ 0.05
    const lowerBound = 1- 0.05
    return {
      price_abc: PriceABC,
      price_def: PriceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    }
  }
}
