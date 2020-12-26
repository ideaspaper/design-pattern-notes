import { ICashReport } from './ICashReport';
import { SimpleCashReportFactory } from './SimpleCashReportFactory';

export class CompanyCashReport {
  private cashReportFactory: SimpleCashReportFactory;

  constructor(cashReportFactory: SimpleCashReportFactory) {
    this.cashReportFactory = cashReportFactory;
  }

  monthlyCashReport(reportType: string): void {
    const cashReport: ICashReport = this.cashReportFactory.createCashReport(reportType);

    cashReport.createChart();
    cashReport.createPrediction();
    cashReport.save();
    cashReport.send();
  }
}
