import { CashReport } from './CashReport';

export class RNDPdfCashReport extends CashReport {
  createChart(): void {
    console.log('RND PDF method to create chart');
  }

  createPrediction(): void {
    console.log('RND PDF method to create prediction');
  }

  send(): void {
    console.log('RND PDF method to send report');
  }
}
