import { ICashReport } from './ICashReport';

export class PdfCashReport implements ICashReport {
  createChart(): void {
    console.log('PDF version chart created');
  }

  createPrediction(): void {
    console.log('PDF version prediction created');
  }

  save(): void {
    console.log('PDF version report saved');
  }

  send(): void {
    console.log('PDF version report sent');
  }
}
