[**BACK**](./README.md)

# Hello World! I am speaking TypeScript!

## Instalasi

Instalasi TypeScript dapat dilakukan menggunakan command di bawah.

```bash
npm install -g typescript
```

> Note: instalasi ini membutuhkan privilege super user, sehingga mungkin diperlukan `sudo` sebelum command di atas.

Cek instalasi TypeScript menggunakan command di bawah.

```bash
tsc --version
```

## Hello World

Apabila instalasi TypeScript sudah berhasil, maka kita bisa mulai membuat program Hello World kita. Eksekusi command di bawah ini.

```bash
mkdir hello-world
cd hello-world
code .
```

Setelah editor Visual Studio Code terbuka, buat sebuah file baru dengan nama `hello-world.ts`. Ketikkan kode program di bawah.

```typescript
let message: string = 'Hello World! I am speaking TypeScript!';
console.log(message);
```

Save kode program tersebut. Kemudian yang perlu kita lakukan berikutnya adalah menerjemahkan (compile) kode program tersebut ke dalam JavaScript agar dapat dieksekusi oleh Node.js.

```bash
tsc hello-world.ts
```

Hasil dari eksekusi command di atas adalah file `hello-world.js`, yang artinya, kode program tersebut dapat dieksekusi menggunakan command di bawah.

```bash
node hello-world.js
```

## tsconfig.json

Sebenarnya, secara default command `tsc` akan menerjemahkan semua file `.ts` yang ada pada direktori project menjadi `.js`. Apabila terdapat banyak file `.ts`, maka isi dari direktori project tersebut akan campur aduk. Maka dari itu, kita dapat menambahkan file konfigurasi TypeScript, yaitu `tsconfig.json` pada direktori project.

Isi sederhana dari `tsconfig.json` adalah seperti di bawah.

```json
{
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

Apabila command `tsc` dieksekusi, maka compiler TypeScript akan mencari file `tsconfig.json`. Compiler TypeScript akan menggunakan parameter-parameter yang dituliskan pada file tersebut saat proses kompilasi. Pada `tsconfig.json` di atas, disebutkan bahwa output hasil kompilasi akan diletakkan pada sebuah direktori dengan nama `dist`.

Informasi lebih lengkap mengenai konfigurasi `tsconfig.json` dapat ditemukan pada [link berikut](https://www.typescriptlang.org/tsconfig).

Untuk mempersingkat proses konfigurasi, saat ini copy-paste `json` berikut pada `tsconfig.json` yang digunakan.

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "./src",
    "lib": [
      "DOM",
      "es2017"
    ],
    "alwaysStrict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "strict": true
  },
  "include": [
    "src/**/*"
  ]
}
```

Berdasarkan konfigurasi tersebut, struktur direktori dari program Hello World kita adalah seperti di bawah.

```
hello-world
├── src
│   ├── hello-world.ts
├── dist
│   ├── hello-world.js
├── tsconfig.json
```

Semua file TypeScript akan diletakkan pada direktori `src`. Hasil proses kompilasi dari command `tsc` akan diletakkan pada direktori `dist`.

[**BACK**](./README.md)
