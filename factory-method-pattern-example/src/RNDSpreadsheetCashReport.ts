import { CashReport } from './CashReport';

export class RNDSpreadsheetCashReport extends CashReport {
  createChart(): void {
    console.log('RND Spreadsheet method to create chart');
  }

  createPrediction(): void {
    console.log('RND Spreadsheet method to create prediction');
  }

  send(): void {
    console.log('RND Spreadsheet method to send report');
  }
}
