import { CashReport } from './CashReport';
import { CompanyCashReport } from './CompanyCashReport';
import { RNDDocCashReport } from './RNDDocCashReport';
import { RNDPdfCashReport } from './RNDPdfCashReport';
import { RNDSpreadsheetCashReport } from './RNDSpreadsheetCashReport';

export class RNDCompanyCashReport extends CompanyCashReport {
  cashReportFactory(reportType: string): CashReport {
    let cashReport: CashReport = <CashReport>{};
    if (reportType === 'doc') {
      cashReport = new RNDDocCashReport();
    } else if (reportType === 'pdf') {
      cashReport = new RNDPdfCashReport();
    } else if (reportType === 'spreadsheet') {
      cashReport = new RNDSpreadsheetCashReport();
    }
    return cashReport;
  }
}
