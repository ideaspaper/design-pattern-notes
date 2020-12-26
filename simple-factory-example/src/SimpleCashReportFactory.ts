import { ICashReport } from './ICashReport';
import { DocCashReport } from './DocCashReport';
import { PdfCashReport } from './PdfCashReport';
import { SpreadsheetCashReport } from './SpreadsheetCashReport';

export class SimpleCashReportFactory {
  createCashReport(reportType: string): ICashReport {
    let cashReport: ICashReport;
    if (reportType === 'doc') {
      cashReport = new DocCashReport();
    } else if (reportType === 'pdf') {
      cashReport = new PdfCashReport();
    } else if (reportType === 'spreadsheet') {
      cashReport = new SpreadsheetCashReport();
    }
    return cashReport;
  }
}
