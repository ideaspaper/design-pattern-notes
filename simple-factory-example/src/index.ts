import { SimpleCashReportFactory } from './SimpleCashReportFactory';
import { CompanyCashReport } from './CompanyCashReport';

const cashReportFactory = new SimpleCashReportFactory();
const companyCashReport = new CompanyCashReport(cashReportFactory);
companyCashReport.monthlyCashReport('doc');
