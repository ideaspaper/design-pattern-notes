import { CashReport } from './CashReport';

export class RNDDocCashReport extends CashReport {
  createChart(): void {
    console.log('RND Doc method to create chart');
  }

  createPrediction(): void {
    console.log('RND Doc method to create prediction');
  }

  send(): void {
    console.log('RND Doc method to send report');
  }
}
