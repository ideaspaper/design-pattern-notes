import { CashReport } from './CashReport';

export abstract class CompanyCashReport {
  monthlyCashReport(reportType: string): void {
    const cashReport: CashReport = this.cashReportFactory(reportType);

    cashReport.createChart();
    cashReport.createPrediction();
    cashReport.save();
    cashReport.send();
  }

  abstract cashReportFactory(reportType: string): CashReport;
}
