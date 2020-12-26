import { CashReport } from './CashReport';

export class ShopDocCashReport extends CashReport {
  createChart(): void {
    console.log('Shop Doc method to create chart');
  }

  createPrediction(): void {
    console.log('Shop Doc method to create prediction');
  }
}
