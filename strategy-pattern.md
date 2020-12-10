[back](./README.md)

# Strategy Pattern

## Problems

Sebuah base class `A` memiliki method `B` yang sudah memiliki suatu implementasi. Pada saat kode program dituntut untuk berubah dan berkembang, terdapat masalah. Tidak semua class turunan dari class `A` harus memiliki implementasi method `B`. Sebagai contoh adalah sebagai berikut.

Kita memiliki sebuah base class `Human` dan class turunan `Adult` seperti di bawah.

```typescript
class Human {
  protected firstName: string;
  protected lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greet() {
    console.log(`Halo nama saya adalah ${this.firstName} ${this.lastName}.`);
  }

  sleep() {
    console.log(`${this.firstName} ${this.lastName} zzz...`);
  }

  eat() {
    console.log(`${this.firstName} ${this.lastName} makan menggunakan sendok.`)
  }

  walk() {
    console.log(`${this.firstName} ${this.lastName} berjalan dengan dua kaki.`);
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }
}

class Adult extends Human {
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
}
```

Contoh penggunaan dari kedua class di atas adalah sebagai berikut.

```typescript
let adultAcong = new Adult('Acong', 'Qwerty');
adultAcong.greet(); // Halo nama saya adalah Acong Qwerty.
adultAcong.sleep(); // Acong Qwerty Zzz...
adultAcong.eat();   // Acong Qwerty makan menggunakan sendok.
adultAcong.walk();  // Acong Qwerty berjalan dengan dua kaki.
```

Suatu saat, client meminta agar program tidak hanya untuk menangani `Adult` saja namun juga `Baby`. Ada kemungkinan bahwa client akan meminta program kita untuk dapat menangani `Toddler` dan `Elder` kedepannya, namun hal tersebut masih belum diputuskan.

Karena kita sudah memiliki class `Human`, maka kita hanya perlu membuat class `Baby` yang merupakan turunan dari `Human`. Namun hal tersebut akan menyebabkan error yaitu:
  - Sebuah baby tidak mungkin bisa memperkenalkan dirinya dengan lancar.
  - Sebuah baby tidak mungkin makan menggunakan sendok.
  - Sebuah baby tidak mungkin berjalan dengan dua kaki.

```javascript
class Baby extends Human {
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
}

let babySitorus = new Baby('Sitorus', 'Asdfg');
babySitorus.greet(); // Halo nama saya adalah Sitorus Asdfg. 😱️
babySitorus.sleep(); // Sitorus Asdfg zzz...
babySitorus.eat();   // Sitorus Asdfg makan menggunakan sendok. 😱️
babySitorus.walk();  // Sitorus Asdfg berjalan dengan dua kaki. 😱️
```

## Short Term Solution

Solusi tercepat dari kasus di atas adalah melakukan overriding pada class `Baby`. Kita akan melakukan override untuk method `greet`, `eat` dan `walk` menjadi seperti di bawah.

```typescript
class Baby extends Human {
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }

  greet() {
    console.log('Nyenyenye...');
  }

  eat() {
    console.log(`${this.firstName} ${this.lastName} menyusu.`)
  }

  walk() {
    console.log(`${this.firstName} ${this.lastName} merangkak.`);
  }
}

let babySitorus = new Baby('Sitorus', 'Asdfg');
babySitorus.greet(); // Nyenyenye...
babySitorus.sleep(); // Sitorus Asdfg zzz...
babySitorus.eat();   // Sitorus Asdfg menyusu.
babySitorus.walk();  // Sitorus Asdfg merangkak.
```

Solusi di atas hanya merupakan solusi _short term_ saja, karena permasalahan berikutnya adalah jika kita hendak membuat banyak class turunan lainnya. Kita akan selalu direpotkan dengan melakukan overriding untuk semua class turunan yang kita buat.

## Solution

> Identify the aspects of your application that vary and separate them from what stays the same.

Pernyataan di atas mengajak kita untuk memisahkan aspek yang berubah-ubah dari hal-hal yang bersifat tetap. Setelah memperhatikan class `Human`, sifat yang selalu tetap adalah `sleep`. Sedangkan sifat `eat`, `greet` dan `walk` berubah-ubah sesuai dengan umur dari `Human`. Kita dapat memisahkan sifat-sifat tersebut dengan memanfaatkan interface. Sebagai contoh adalah sifat `greet` seperti di bawah.

```typescript
interface IGreet {
  execute();
}

class NoGreet implements IGreet {
  private owner: Human;
  
  constructor(owner) {
    this.owner = owner;
  }

  execute() {
    console.log('Nyenyenye...')
  }
}

class ProperGreet implements IGreet {
  private owner: Human;
  
  constructor(owner) {
    this.owner = owner;
  }

  execute() {
    console.log(`Halo nama saya adalah ${this.owner.getFirstName()} ${this.owner.getLastName()}.`);
  }
}
```

Apa yang terjadi dengan class `Human`, `Adult` dan `Baby`? Kita dapat mengubah implementasi class-class tersebut menjadi seperti di bawah.

```typescript
class Human {
  private firstName: string;
  private lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Karena dari semua rentang umur hanya aktivitas sleep yang sama,
  // maka method sleep diletakkan pada base class
  sleep() {
    console.log(`${this.firstName} ${this.lastName} zzz...`);
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }
}

class Adult extends Human {
  greet: IGreet = new ProperGreet(this); // Kita menentukan bahwa class Adult akan menggunakan ProperGreet

  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
}

class Baby extends Human {
  greet: IGreet = new NoGreet(this); // Kita menentukan bahwa class Baby akan menggunakan NoGreet
  
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
}
```

Menggunakan cara di atas, kita dapat menentukan _strategy_ apa yang akan digunakan untuk masing-masing class. Apabila client meminta agar program kita dapat menangani `Elder`, kita dapat membuat _strategy_ baru untuk `greet` dengan menambahkan implementasi interface `IGreet` seperti di bawah.

```typescript
class SlowGreet implements IGreet {
  private owner: Human;
  
  constructor(owner) {
    this.owner = owner;
  }

  execute() {
    console.log(`Halo anak muda... Nama saya adalah ${this.owner.getFirstName()} ${this.owner.getLastName()}.`);
  }
}
```

Sedangkan bentuk class dari `Elder` akan menjadi seperti di bawah.

```typescript
class Elder extends Human {
  greet: IGreet = new SlowGreet(this);
  
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
}
```

Apabila client meminta agar program kita dapat menangani `Teenager`, kita tidak perlu membuat _strategy_ greet baru. Kita cukup menggunakan `ProperGreet` yang telah kita buat sebelumnya.

```typescript
class Teenager extends Human {
  greet: IGreet = new ProperGreet(this);

  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
}
```

## Better Approach

Apabila kita amati, implementasi yang sudah dilakukan di atas tidak fleksibel. Pada class `Teenager`, implementasi greet ditentukan secara _hard-code_. Apabila kita membuat sebuah object menggunakan class `Teenager`, _strategy_ dari `greet` sudah ditentukan, yaitu `ProperGreet`. Hal seperti ini disebut juga sebagai _tight coupling_. Class `Teenager` akan bergantung secara langsung pada class `ProperGreet`. _Tight coupling_ akan mengurangi fleksibilitas dari kode program dan seharusnya dihindari. Kita dapat memanfaatkan fungsi setter untuk menghindari hal tersebut.

Contoh dari implementasi fungsi setter `greet` pada class `Teenager` adalah seperti di bawah.

```typescript
class Teenager extends Human {
  greet: IGreet;

  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }

  setGreet(greetStrategy: IGreet) {
    this.greet = greetStrategy;
  }
}
```

Dengan adanya fungsi setter, maka kita dapat menentukan _strategy_ `greet` yang akan digunakan pada saat _runtime_.

```typescript
let teenagerAcong = new Teenager('Sitorus', 'Asdfg');
teenagerAcong.setGreet(new ProperGreet(teenagerAcong));
teenagerAcong.greet.execute();
```

[back](./README.md)