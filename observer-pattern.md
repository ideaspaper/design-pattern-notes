[**BACK**](./README.md)

# Observer Pattern

## Problems

Anggaplah terdapat sebuah portal berita dan seseorang yang suka sekali membaca berita. Orang tersebut sering membaca pada portal berita tersebut, namun sering kali kecewa karena belum ada update. Terdapat dua cara untuk menyelesaikan permasalahan ini, yaitu:
  1. Orang tersebut harus tetap mengunjungi portal berita tersebut hingga mendapatkan berita baru. Cara tersebut tentunya sangat merepotkan bagi pengunjung, karena akhirnya banyak kunjungan yang sia-sia.
  1. Portal berita mengirimkan notifikasi apabila terdapat berita baru kepada banyak alamat email. Cara kedua ini tentunya merupakan tindak kriminal (perilaku tidak menyenangkan), karena akan dianggap sebagai spam.

## Solution

Observer pattern adalah desain yang mengunakan konsep publisher-subscriber. Cerita yang paling umum untuk digunakan sebagai analogi adalah saat kita berlangganan surat kabar. Apabila kita hendak belangganan surat kabar, kita akan menghubungi penerbit. Penerbit kemudian akan mencatat nama kita ke dalam sebuah list. Apabila terdapat surat kabar yang baru, maka penerbit akan segera mengirimkannya ke kita. Hanya orang-orang yang berlangganan saja yang akan mendapatkan surat kabar. Pada observer pattern, penerbit akan disebut sebagai **subject**, sedangkan pelanggan akan disebut sebagai **observer**.

Sebuah subject akan membutuhkan sebuah array sebagai list penampung observer. Subject dapat menambah ataupun menghapus observer dari list tersebut. Selain itu, subject juga harus dapat memberitahu semua observer bahwa terdapat perubahan data. Dengan pengertian tersebut, maka kita dapat membuat sebuah interface untuk subject seperti di bawah.

```typescript
interface ISubject {
  registerObserver(observer: IObserver): boolean;
  removeObserver(observer: IObserver): boolean;
  notifyObserver(): void;
}
```

Seorang pelanggan surat kabar harus memberikan alamatnya kepada penerbit, agar penerbit dapat mengirimkan surat kabar ke rumahnya. Sama halnya dengan observer. Sebuah observer harus memiliki suatu method yang nantinya akan dipanggil oleh subject ketika terdapat perubahan data. Dengan pengertian tersebut, maka kita dapat membuat sebuah interface untuk observer seperti di bawah.

```typescript
interface IObserver {
  update(value: string): void;
}
```

Kembali ke tema permasalahan awal yaitu portal berita. Hal yang kita perlu buat selanjutnya adalah interface `INews` seperti di bawah.

```typescript
interface INews {
  setNews(value: string): void;
  getNews(): string;
}
```

Selanjutnya kita akan membuat sebuah class `NewsPortal` yang mengimplementasikan dua buah interface yaitu `ISubject` dan `INews`. Dengan demikian, class `NewsPortal` harus menyediakan method-method yang ada pada kedua buah interface tersebut. Object yang dibuat menggunakan `NewsPortal` akan menjadi subject. Bentuk dari `NewsPortal` adalah seperti di bawah.

```typescript
class NewsPortal implements ISubject, INews {
  private news: string = <string>{};
  private observers: IObserver[] = [];

  registerObserver(observer: IObserver): boolean { // Menambahkan observer ke list observers
    if (this.observers.includes(observer)) {
      return false;
    }
    this.observers.push(observer);
    return true;
  }

  removeObserver(observer: IObserver): boolean { // Menghapus observer dari list observers
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return false;
    }
    this.observers.splice(observerIndex, 1);
    return true;
  }

  notifyObserver(): void { // Memanggil method update semua observer yang ada pada list observers
    for (const observer of this.observers) {
      observer.update(this.news); // Mengirimkan update data ke observer
    }
  }

  setNews(value: string): void { // Apabila terjadi update pada value property news
    this.news = value;
    this.notifyObserver(); // Maka panggil method notifyObserver
  }

  getNews(): string {
    return this.news;
  }
}
```

Agar sesi percobaan kita lengkap, mari kita buat class `Customer` sebagai berikut.

```typescript
class Customer implements IObserver {
  private firstName: string;
  private lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  update(value: string): void {
    console.log(`My name is ${this.firstName} ${this.lastName}. I got news that ${value}.`);
  }
}
```

Setelah semua interface dan class siap, kita akan buat skenario sebagai berikut:
1. Terdapat sebuah portal berita CNN News.
1. Terdapat 3 orang yang hendak berlangganan berita, yaitu John Doe, Abigail Astro dan James Wood.
1. Terdapat 1 orang yang tidak berlangganan berita, yaitu Acong Suherman.
1. CNN News akan mencatat nama orang-orang yang berlangganan.
1. Apabila terdapat berita baru, maka CNN News hanya akan memberitahu pelanggannya.

Skenario di atas dapat dituangkan menjadi kode program seperti di bawah.

```typescript
// 1. Terdapat sebuah portal berita CNN News.
let cnnNews = new NewsPortal();

// 2. Terdapat 3 orang yang hendak berlangganan berita, yaitu John Doe, Abigail Astro dan James Wood.
let johnDoe = new Customer('John', 'Doe');
let abigailAstro = new Customer('Abigail', 'Astro');
let jamesWood = new Customer('James', 'Wood');

// 3. Terdapat 1 orang yang tidak berlangganan berita, yaitu Acong Suherman.
let acongSuherman = new Customer('Acong', 'Suherman');

// 4. CNN News akan mencatat nama orang-orang yang berlangganan.
cnnNews.registerObserver(johnDoe);
cnnNews.registerObserver(abigailAstro);
cnnNews.registerObserver(jamesWood);

// 5. Apabila terdapat berita baru, maka CNN News hanya akan memberitahu pelanggannya.
cnnNews.setNews("Fitch Assigns Rakuten International Commercial Bank First-Time 'A(twn)'; Outlook Negative");
cnnNews.setNews("Disney unveils Star, its Hulu replacement for international Disney Plus subscribers");
```

Hasil dari kode program di atas adalah seperti di bawah.

```
My name is John Doe. I got news that Fitch Assigns Rakuten International Commercial Bank First-Time 'A(twn)'; Outlook Negative.
My name is Abigail Astro. I got news that Fitch Assigns Rakuten International Commercial Bank First-Time 'A(twn)'; Outlook Negative.
My name is James Wood. I got news that Fitch Assigns Rakuten International Commercial Bank First-Time 'A(twn)'; Outlook Negative.
My name is John Doe. I got news that Disney unveils Star, its Hulu replacement for international Disney Plus subscribers.
My name is Abigail Astro. I got news that Disney unveils Star, its Hulu replacement for international Disney Plus subscribers.
My name is James Wood. I got news that Disney unveils Star, its Hulu replacement for international Disney Plus subscribers.
```

Acong Suherman tidak akan mendapatkan berita tersebut, karena dia tidak berlangganan CNN News.

## Example

Contoh implementasi observer pattern terdapat pada [link ini](./observer-pattern-example).

[**BACK**](./README.md)