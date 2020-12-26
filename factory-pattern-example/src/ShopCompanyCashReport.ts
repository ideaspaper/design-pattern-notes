import { CashReport } from './CashReport';
import { CompanyCashReport } from './CompanyCashReport';
import { ShopDocCashReport } from './ShopDocCashReport';
import { ShopPdfCashReport } from './ShopPdfCashReport';
import { ShopSpreadsheetCashReport } from './ShopSpreadsheetCashReport';

export class ShopCompanyCashReport extends CompanyCashReport {
  cashReportFactory(reportType: string): CashReport {
    let cashReport: CashReport;
    if (reportType === 'doc') {
      cashReport = new ShopDocCashReport();
    } else if (reportType === 'pdf') {
      cashReport = new ShopPdfCashReport();
    } else if (reportType === 'spreadsheet') {
      cashReport = new ShopSpreadsheetCashReport();
    }
    return cashReport;
  }
}
