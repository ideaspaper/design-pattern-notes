import { ICashReport } from './ICashReport';

export class SpreadsheetCashReport implements ICashReport {
  createChart(): void {
    console.log('Spreadsheet version chart created');
  }

  createPrediction(): void {
    console.log('Spreadsheet version prediction created');
  }

  save(): void {
    console.log('Spreadsheet version report saved');
  }

  send(): void {
    console.log('Spreadsheet version report sent');
  }
}
