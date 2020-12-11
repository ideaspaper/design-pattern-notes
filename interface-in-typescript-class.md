# Interface in TypeScript (Class)

Apabila class merupakan blueprint dari object, maka interface adalah blueprint dari class. Seperti namanya, yaitu interface (antarmuka), user akan menggunakan property dan method yang tersedia pada interface untuk berinteraksi dengan program kita. Maka dari itu, property dan method yang ada pada interface akan bersifat public. Contoh dari penerapan interface adalah seperti di bawah ini.

```typescript
interface IButton {
  click(): void;
}

class ExitButton implements IButton {
  click(): void {
    console.log('Exit Program');
  }
}

class StartButton implements IButton {
  click(): void {
    console.log('Start Program');
  }
}

let button1: IButton = new StartButton();
button1.click();

let button2: IButton = new ExitButton();
button2.click();
```

Pada contoh di atas, terdapat sebuah interface yaitu `IButton`. Interface tersebut digunakan sebagai blueprint dari class `ExitButton` dan `StartButton`. Maka dari itu kedua button tersebut harus menyediakan implementasi method `click`. Apabila, sebagai contoh, `StartButton` tidak membuat implementasi dari method `click` maka akan terdapat error sebagai berikut.

```
Class 'StartButton' incorrectly implements interface 'IButton'.
```

Dengan kode program di atas, user hanya perlu tahu bahwa sebuah button pasti memiliki method `click`. User tidak perlu dipusingkan dengan detil implementasinya. Jika user membuat object `ExitButton`, maka dapat dipastikan bahwa `click` akan menghasilkan action exit. Apabila kedepannya terdapat button lain selain `StartButton` dan `ExitButton`, user tetap dapat menggunakan button-button tersebut dengan cara memanggil method `click`. Hal ini akan membuat kode program menjadi seragam sehingga memudahkan user untuk menggunakan kode program yang kita buat.
