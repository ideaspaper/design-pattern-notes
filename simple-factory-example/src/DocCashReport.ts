import { ICashReport } from './ICashReport';

export class DocCashReport implements ICashReport {
  createChart(): void {
    console.log('Doc version chart created');
  }

  createPrediction(): void {
    console.log('Doc version prediction created');
  }

  save(): void {
    console.log('Doc version report saved');
  }

  send(): void {
    console.log('Doc version report sent');
  }
}
