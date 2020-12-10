[back](./README.md)

# Class in TypeScript

## Class

Class merupakan blueprint dari object. Kita dapat menggunakan class untuk membuat object-object baru sesuai kebutuhan program kita. Sifat dari object yang dibuat akan ditentukan dari blueprint yang digunakan. Pada TypeScript, kita dapat membuat sebuah class dengan menggunakan keyword `class`.

### Property

Sebuah class dapat memiliki property. Sebagai contoh, class Person memiliki property `firstName` dan `lastName`, di mana keduanya memiliki tipe `string`.

```typescript
class Person {
  firstName: string;
  lastName: string;
}

let johnDoe: Person = new Person(); // Membuat object Person
johnDoe.firstName = 'John'; // Mengisi property firstName dengan value 'John'
johnDoe.lastName = 'Doe';   // Mengisi property lastName dengan value 'Doe'

console.log(johnDoe);       // Person { firstName: 'John', lastName: 'Doe' }
```

### Method

Selain property, class juga dapat memiliki method (function). Apabila kita menyertakan method pada sebuah class, maka semua object yang dibuat menggunakan class tersebut akan memiliki method itu juga.

```typescript
class Person {
  firstName: string;
  lastName: string;

  greet(): void {
    console.log(`Hello my name is ${this.firstName} ${this.lastName}. You can call me ${this.firstName}.`);
  }
}

let johnDoe: Person = new Person();
johnDoe.firstName = 'John';
johnDoe.lastName = 'Doe';
johnDoe.greet(); // Hello my name is John Doe. You can call me Doe.

let johnSmith: Person = new Person();
johnSmith.firstName = 'John';
johnSmith.lastName = 'Smith';
johnSmith.greet(); // Hello my name is John Smith. You can call me Smith.
```

### Constructor

Constructor merupakan sebuah method khusus yang hanya akan dipanggil saat pembuatan sebuah object menggunakan keyword `new`. Tujuan dari constructor adalah melakukan inisialisasi property dari sebuah object. Method constructor dapat dibuat menggunakan keyword `constructor`.

```typescript
class Person {
  firstName: string;
  lastName: string;

  constructor(fn: string, ln: string) {
    this.firstName = fn;
    this.lastName = ln;
  }

  greet(): void {
    console.log(`Hello my name is ${this.firstName} ${this.lastName}. You can call me ${this.lastName}.`);
  }
}

let johnDoe: Person = new Person('John', 'Doe'); // Membuat object Person menggunakan constructor
                                         // 'John' sebagai value argumen fn
                                         // 'Doe' sebagai value argumen ln

johnDoe.greet(); // Hello my name is John Doe. You can call me Doe.
```

### this

Pada contoh di atas, terdapat keyword `this`. Keyword tersebut merujuk pada object yang telah dibuat menggunakan keyword `new`. Agar lebih memahami `this`, jalankan kode program berikut.

```typescript
class Person {
  firstName: string;
  lastName: string;

  constructor(fn: string, ln: string) {
    this.firstName = fn;
    this.lastName = ln;
  }

  state(): void {
    console.log(this);
  }
}

let johnDoe: Person = new Person('John', 'Doe'); // Membuat object Person menggunakan constructor
johnDoe.state();      // Person { firstName: 'John', lastName: 'Doe' }
console.log(johnDoe); // Person { firstName: 'John', lastName: 'Doe' }
```

Dengan pengertian di atas, maka:
  - Statement `this.firstName = fn;` di dalam `constructor` memiliki arti, melakukan assignment nilai argumen `fn` ke property `firstName` dari object.
  - Statement `console.log(this);` pada method `state` memiliki arti, mencetak object ke terminal.

### Method Chaining

Anggap kita memiliki sebuah class `Message` seperti di bawah.

```typescript
class Message {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  formatReverse(): void {
    this.value = this.value.split('').reverse().join('');
  }

  formatTitleCase(): void {
    let valueSplitted: string[] = this.value.split(' ');
    for (let i = 0; i < valueSplitted.length; i++) {
      valueSplitted[i] = valueSplitted[i][0].toUpperCase() + valueSplitted[i].slice(1);
    }
    this.value = valueSplitted.join(' ');
  }

  print(): void {
    console.log(this.value);
  }
}
```

Apabila kita memiliki pesan `'acong pergi ke pasar'`, kemudian kita hendak melakukan:
1. Membalik pesan tersebut.
1. Mengubah format dari pesan tersebut ke title case.
1. Menampilkan pesan tersebut ke terminal.

Dengan class seperti di atas, maka kode program yang akan kita buat adalah seperti di bawah.

```typescript
let greeting: Message = new Message('acong pergi ke pasar');
greeting.formatReverse();
greeting.formatTitleCase();
greeting.print();
```

Meskipun tidak salah, penulisan kode program di atas terkesan _verbose_. Kita dapat menyederhanakan kode program di atas dengan konsep method chaining. Pertama-tama kita ubah kode program dari class `Message` menjadi seperti di bawah.

```typescript
class Message {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  formatReverse(): this {
    this.value = this.value.split('').reverse().join('');
    return this; // Setelah melakukan operasi reverse pada value, return object menggunakan keyword this
  }

  formatTitleCase(): this {
    let valueSplitted: string[] = this.value.split(' ');
    for (let i = 0; i < valueSplitted.length; i++) {
      valueSplitted[i] = valueSplitted[i][0].toUpperCase() + valueSplitted[i].slice(1);
    }
    this.value = valueSplitted.join(' ');
    return this; // Setelah melakukan operasi title case pada value, return object menggunakan keyword this
  }

  print(): void {
    console.log(this.value);
  }
}
```

Karena method `formatReverse` dan `formatTitleCase` memberikan return value, yaitu object itu sendiri, maka kita bisa memanggil kembali (chaining) method yang ada pada object tersebut. Kode program yang akan kita buat menjadi lebih sederhana seperti contoh di bawah.

```typescript
let greeting: Message = new Message('acong pergi ke pasar');
greeting.formatReverse().formatTitleCase().print();
```

[back](./README.md)
