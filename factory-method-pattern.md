[**BACK**](./README.md)

# Factory Method Pattern

## Problems

Coba kita lihat kembali contoh kode program [simple factory](./simple-factory.md). Bagaimana jika ternyata perusahaan tersebut memiliki banyak divisi yang akan membuat laporan keuangan? Bagaimana agar masing-masing divisi dapat menggunakan cara standar (default) untuk membuat laporan keuangan, namun tidak membatasi kemungkinan untuk melakukan penyesuaian seperlunya?

## Solution (part 1)

Sebuah method pada interface tidak dapat memiliki implementasi. Lalu bagaimana cara kita membuat algoritma default untuk membuat sebuah laporan? Jawabannya adalah dengan menggunakan abstract class.

Abstract class, seperti namanya, abstrak. Kita tidak dapat membuat object dari abstract class, sehingga kita harus membuat class turunannya terlebih dahulu. Sebuah method pada abstract class dapat memiliki implementasi yang akan diwarisi oleh class turunannya. Mari kita ganti interface `ICashReport` sebelumnya dengan abstract class `CashReport` seperti di bawah.

```typescript
abstract class CashReport {
  createChart(): void {
    console.log('Default method to create chart');
  }

  createPrediction(): void {
    console.log('Default method to create prediction');
  }

  save(): void {
    console.log('Default method to save report');
  }

  send(): void {
    console.log('Default method to save report');
  }
}
```

Selanjutnya kita akan membuat class untuk report masing-masing divisi. Sebagai contoh terdapat dua divisi, yaitu RND dan Shop.

```typescript
class RNDDocCashReport extends CashReport {
  createChart(): void {
    console.log('RND Doc method to create chart');
  }

  createPrediction(): void {
    console.log('RND Doc method to create prediction');
  }

  send(): void {
    console.log('RND Doc method to send report');
  }
}
// class RNDPdfCashReport extends CashReport
// class RNDSpreadsheetCashReport extends CashReport

class ShopDocCashReport extends CashReport {
  createChart(): void {
    console.log('Shop Doc method to create chart');
  }

  createPrediction(): void {
    console.log('Shop Doc method to create prediction');
  }
}
// class ShopPdfCashReport extends CashReport
// class ShopSpreadsheetCashReport extends CashReport
```

Pada contoh di atas, divisi RND melakukan perubahan pada method `createChart`, `createPrediction` dan `send`. Divisi RND akan menggunakan implementasi default method `save`. Divisi Shop melakukan perubahan pada method `createChart` dan `createPrediction`. Divisi Shop akan menggunakan implementasi default method `save` dan `send`.

## Solution (part 2)

Hal berikutnya yang perlu kita lakukan adalah membuat report factory untuk masing-masing divisi. Apabila kita meneruskan contoh [simple factory](./simple-factory.md), maka kita akan membuat class simple cash report factory untuk setiap divisi yang ada. Implementasi kode programnya menjadi seperti di bawah.

```typescript
interface ISimpleCashReportFactory {
  createCashReport(reportType: string): CashReport;
}

class RNDSimpleCashReportFactory implements ISimpleCashReportFactory {
  createCashReport(reportType: string): CashReport {
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

class ShopSimpleCashReportFactory implements ISimpleCashReportFactory {
  createCashReport(reportType: string): CashReport {
    let cashReport: CashReport = <CashReport>{};
    if (reportType === 'doc') {
      cashReport = new ShopDocCashReport();
    } else if (reportType === 'pdf') {
      cashReport = new RNDPdfCashReport();
    } else if (reportType === 'spreadsheet') {
      cashReport = new RNDSpreadsheetCashReport();
    }
    return cashReport;
  }
}
```

Karena masing-masing divisi memiliki class factory sendiri, maka kita membutuhkan interface `ISimpleCashReportFactory` untuk dapat digunakan oleh `CompanyCashReport`. Kode program dari `CompanyCashReport` beserta demo-nya adalah seperti di bawah.

```typescript
class CompanyCashReport {
  private cashReportFactory: ISimpleCashReportFactory;

  constructor(cashReportFactory: ISimpleCashReportFactory) {
    this.cashReportFactory = cashReportFactory;
  }

  monthlyCashReport(reportType: string): void {
    const cashReport: CashReport = this.cashReportFactory.createCashReport(reportType);

    cashReport.createChart();
    cashReport.createPrediction();
    cashReport.save();
    cashReport.send();
  }
}

const rndCashReportFactory = new RNDSimpleCashReportFactory();
const companyCashReport = new CompanyCashReport(rndCashReportFactory);
companyCashReport.monthlyCashReport('doc');
```

## Solution (part 3)

Apabila kita amati [Solution (part 2)](#solution-part-2), alangkah lebih praktisnya apabila proses factory dilakukan di dalam class `CompanyCashReport` saja. Jika kita amati bagian demo kode program di atas, tanpa melihat dokumentasi ataupun kode program, user pasti dibingungkan dengan bagaimana cara membuat monthly cash report untuk divisi RND.

Agar kode program user menjadi lebih sederhana dan intuitif, kita dapat melakukan langkah-langkah berikut:

1. Mengubah class `CompanyCashReport` menjadi abstract.
1. Menambahkan sebuah abstract method, yaitu `cashReportFactory` pada `CompanyCashReport`, yang nantinya harus di-override oleh class turunannya.
1. Membuat class turunan dari `CompanyCashReport`, yaitu `RNDCompanyCashReport` dan `ShopCompanyCashReport`.

Bentuk dari class `CompanyCashReport` menjadi seperti di bawah.

```typescript
abstract class CompanyCashReport {
  monthlyCashReport(reportType: string): void {
    const cashReport: CashReport = this.cashReportFactory(reportType);

    cashReport.createChart();
    cashReport.createPrediction();
    cashReport.save();
    cashReport.send();
  }

  abstract cashReportFactory(reportType: string): CashReport;
}
```

Cash report tidak lagi didapatkan dari object factory. Pada kode program di atas, cash report didapatkan dari method `cashReportFactory` yang implementasinya akan ditentukan pada class turunan `CompanyCashReport`. Maka dari itu nama dari pattern ini adalah **Factory Method**.

Karena `CompanyCashReport` merupakan abstract class, maka kita harus membuat class turunannya, yaitu `RNDCompanyCashReport` dan `ShopCompanyCashReport` seperti di bawah.

```typescript
class RNDCompanyCashReport extends CompanyCashReport {
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

class ShopCompanyCashReport extends CompanyCashReport {
  cashReportFactory(reportType: string): CashReport {
    let cashReport: CashReport = <CashReport>{};
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
```

Dengan perubahan seperti di atas, kode program dari sisi user menjadi lebih sederhana dan intuitif seperti di bawah.

```typescript
const rndCashReport = new RNDCompanyCashReport();
rndCashReport.monthlyCashReport('doc');
```

## Example

Contoh implementasi factory pattern terdapat pada [link ini](./factory-method-pattern-example).

[**BACK**](./README.md)