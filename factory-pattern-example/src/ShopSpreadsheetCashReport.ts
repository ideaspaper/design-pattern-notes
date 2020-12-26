import { CashReport } from './CashReport';

export class ShopSpreadsheetCashReport extends CashReport {
  createChart(): void {
    console.log('Shop Spreadsheet method to create chart');
  }

  createPrediction(): void {
    console.log('Shop Spreadsheet method to create prediction');
  }
}
