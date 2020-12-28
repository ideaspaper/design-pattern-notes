[**BACK**](./README.md)

# Simple Factory

## Problems

Terkadang kita menemukan keadaan di mana object yang akan kita buat ditentukan berdasarkan suatu kondisi. Sebagai contoh adalah object untuk membuat laporan keuangan. Apabila kita menerapkan prinsip interface, maka bentuk dari interface yang dimaksud adalah seperti di bawah.

```typescript
interface ICashReport {
  createChart(): void;
  createPrediction(): void;
  save(): void;
  send(): void;
}
```

Interface di atas akan digunakan untuk membuat class beberapa tipe report yang dibutuhkan. Sebagai contoh adalah Doc, PDF dan Spreadsheet seperti di bawah.

```typescript
class DocCashReport implements ICashReport {
  createChart(): void {
    console.log('Doc version chart created');
  }

  createPrediction(): void {
    console.log('Doc version prediction created');
  }

  save(): void {
    console.log('Doc version report saved');
  }

  send(): void {
    console.log('Doc version report sent');
  }
}

class PdfCashReport implements ICashReport {
  createChart(): void {
    console.log('PDF version chart created');
  }

  createPrediction(): void {
    console.log('PDF version prediction created');
  }

  save(): void {
    console.log('PDF version report saved');
  }

  send(): void {
    console.log('PDF version report sent');
  }
}

class SpreadsheetCashReport implements ICashReport {
  createChart(): void {
    console.log('Spreadsheet version chart created');
  }

  createPrediction(): void {
    console.log('Spreadsheet version prediction created');
  }

  save(): void {
    console.log('Spreadsheet version report saved');
  }

  send(): void {
    console.log('Spreadsheet version report sent');
  }
}
```

Selanjutnya kita membuat sebuah class `CompanyCashReport`. Class tersebut memiliki sebuah method `monthlyCashReport` yang akan membuat object report berdasarkan dari `reportType`.

```typescript
class CompanyCashReport {
  monthlyCashReport(reportType: string): void {
    let cashReport: ICashReport = <ICashReport>{};

    if (reportType === 'doc') {
      cashReport = new DocCashReport();
    } else if (reportType === 'pdf') {
      cashReport = new PdfCashReport();
    } else if (reportType === 'spreadsheet') {
      cashReport = new SpreadsheetCashReport();
    }

    cashReport.createChart();
    cashReport.createPrediction();
    cashReport.save();
    cashReport.send();
  }
}
```

Jika terdapat permintaan update dari client untuk menambahkan jenis report yang baru, maka kita perlu melakukan penyesuaian pada `monthlyCashReport`. Apabila terdapat banyak method lain yang memiliki statement kondisional seperti di atas, maka kita harus melakukan penyesuaian untuk semua method tersebut. Hal ini mengakibatkan proses maintenance akan menjadi semakin sulit dan lebih rentan terhadap error.

## Solution

Mari kita coba untuk menerapkan tips di bawah.

> Identify the aspects of your application that vary and separate them from what stays the same.

Jika kita perhatikan kode program di atas, hal yang berubah-ubah terdapat pada bagian statement kondisional. Maka dari itu, bagian tersebut dapat kita kelompokkan menjadi sebuah class seperti di bawah.

```typescript
class SimpleCashReportFactory {
  createCashReport(reportType: string): ICashReport {
    let cashReport: ICashReport = <ICashReport>{};
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
```

Class `CashReportFactory` berikutnya dapat digunakan pada `CompanyCashReport` seperti di bawah.

```typescript
class CompanyCashReport {
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

const simpleCashReportFactory = new SimpleCashReportFactory();
const companyCashReport = new CompanyCashReport(simpleCashReportFactory);
companyCashReport.monthlyCashReport('doc');
companyCashReport.monthlyCashReport('pdf');
companyCashReport.monthlyCashReport('spreadsheet');
```

Karena kita sudah mengelompokkan statement kondisional pembuatan object ke dalam sebuah class `SimpleCashReportFactory`, apabila client meminta update jenis report baru, kita hanya perlu mengubah kode program `SimpleCashReportFactory` serta membuat class baru untuk jenis report yang diminta. Hal ini tentu jauh lebih mudah dibandingkan dengan mengubah semua statement kondisional pembuatan object yang tersebar pada banyak method.

## Example

Contoh implementasi simple factory terdapat pada [link ini](./simple-factory-example).

[**BACK**](./README.md)