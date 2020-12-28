import { RNDCompanyCashReport } from './RNDCompanyCashReport';
import { ShopCompanyCashReport } from './ShopCompanyCashReport';

const shopCashReport = new ShopCompanyCashReport();
shopCashReport.monthlyCashReport('doc');
shopCashReport.monthlyCashReport('pdf');
shopCashReport.monthlyCashReport('spreadsheet');

const rndCashReport = new RNDCompanyCashReport();
rndCashReport.monthlyCashReport('doc');
rndCashReport.monthlyCashReport('pdf');
rndCashReport.monthlyCashReport('spreadsheet');
