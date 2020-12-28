import { CashReport } from './CashReport';

export class ShopPdfCashReport extends CashReport {
  createChart(): void {
    console.log('Shop PDF method to create chart');
  }

  createPrediction(): void {
    console.log('Shop PDF method to create prediction');
  }
}
