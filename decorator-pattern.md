[**BACK**](./README.md)

# Decorator Pattern

## Problems

Kode program dibuat berdasarkan requirement dari client. Apabila usaha dari client berkembang, maka requirement tersebut juga akan berubah. Maka dari itu, suatu kode program yang baik selalu siap untuk mengalami perubahan. Dengan semua perubahan requirement yang ada, sebisa mungkin kita hanya melakukan sedikit modifikasi pada kode program yang sudah ada.

Anggap terdapat contoh kasus sebagai berikut. Sebuah client membutuhkan sebuah program yang dapat menangani barang yang dia jual. Anggap dia akan menjual sebuah lemari. Lemari tersebut akan dibuat sesuai dengan permintaan customer. Sebagai contoh, customer dapat menambahkan pintu, kaca, ukiran, warna cat, jumlah rak, dll. Permintaan dari customer tidak fix, jadi dimungkinkan akan ada hal-hal baru yang bisa ditambahkan namun belum terpikirkan.

Target kita adalah membuat sebuah object untuk merepresentasikan lemari tersebut beserta segala tambahannya. Apakah kita akan membuat sebuah base class `Lemari` kemudian membuat banyak class turunan sesuai dengan semua tambahan yang ada? Tentunya ini akan menambah beban maintenance, karena kita harus membuat class baru untuk semua tambahan yang bahkan saat ini belum terpikirkan.

## Solution

Decorator pattern merupakan solusi untuk jenis pemasalahan di atas. Decorator pattern digunakan untuk menambahkan sebuah responsibilitas baru dari yang sudah ada sebelumnya. Sebagai contoh, class `Lemari` akan memiliki property `harga` dengan value 500000. Apabila terdapat permintaan untuk ditambahkan ukiran, kita hanya perlu menambahkan, misal 75000 pada harga awal, yaitu 500000 (note: disini kita menambahkan, bukan mengubah harga awal).

Langkah pertama yang dilakukan pada decorator pattern adalah membuat sebuah interface yang akan digunakan oleh class `Product` dan `Decorator`.

```typescript
interface IProduct {
  setName(name: string): void;
  getName(): string;
  setPrice(price: number): void,
  getPrice(): number;
}
```

Bentuk dari class `Product` dan `Decorator` adalah seperti di bawah.

```typescript
class Product implements IProduct {
  private name: string = <string>{};
  private price: number = <number>{};

  setName(name: string): void {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setPrice(price: number): void {
    this.price = price;
  }

  getPrice(): number {
    return this.price;
  }
}

class Decorator implements IProduct {
  protected name: string = <string>{};
  protected price: number = <number>{};
  protected product: IProduct;

  constructor(product: IProduct) {
    this.product = product;
  }

  setName(name: string): void {
    const lastName = this.product.getName();
    this.name = `${name} ${lastName}`;
  }

  getName(): string {
    return this.name;
  }

  setPrice(price: number): void {
    const lastPrice = this.product.getPrice();
    this.price = lastPrice + price;
  }

  getPrice(): number {
    return this.price;
  }
}
```

Class `Decorator` mengimplementasikan `IProduct`. Hal ini dikarenakan, kita akan menambahkan responsibilitas baru pada object `Product` yang sudah ada. Maka dari itu, kita menggunakan blueprint yang sama pula untuk membuat object `Decorator`.

Jika diperhatikan, pada class `Decorator` terdapat sebuah property tambahan yaitu `product`. Property tersebutlah yang akan kita "bungkus" atau berikan dekorasi. Kode program pada method `setName` dan `setPrice`, diawali dengan mendapatkan nilai dari `product`. Nilai tersebutlah yang kemudian ditambahkan dengan nilai baru.

Berikut adalah contoh penggunaan dari class-class yang telah kita buat sebelumnya.

```typescript
let product: IProduct = new Product(); // Kita membuat sebuah produk
product.setName('Lemari');             // Menentukan bahwa nama produk adalah Lemari
product.setPrice(500000);              // Menentukan harga dari lemari

let scluptured: IProduct = new Decorator(product); // Membuat sebuah decorator,
                                                   // dan menentukan bahwa yang hendak diberi decorator adalah object product
scluptured.setName('Scluptured');                  // Menentukan nama decorator
scluptured.setPrice(75000);                        // Menentukan harga decorator

let painted: IProduct = new Decorator(scluptured); // Membuat sebuah decorator,
                                                   // dan menentukan bahwa yang hendak diberi decorator adalah object scluptured
painted.setName('Painted');                        // Menentukan nama decorator
painted.setPrice(28500);                           // Menentukan harga decorator

console.log(painted.getName());  // Painted Scluptured Lemari
console.log(painted.getPrice()); // 603500
```

Object terakhir yang kita gunakan setelah proses dekorasi adalah `painted`. Object tersebut memiliki method yang sama dengan `product` karena mengimplementasikan interface yang sama, yaitu `IProduct`. Apabila terdapat jenis dekorasi baru, kita hanya perlu membuat object `Decorator` baru untuk membungkus object `painted`.

## Example

Contoh implementasi decorator pattern terdapat pada [link ini](./decorator-pattern-example).

[**BACK**](./README.md)