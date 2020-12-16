import { IProduct } from './IProduct';
import { Product } from './Product'
import { Decorator } from './Decorator';

let product: IProduct = new Product();
product.setName('Lemari');
product.setPrice(500000);

let scluptured: IProduct = new Decorator(product);
scluptured.setName('Scluptured');
scluptured.setPrice(75000);

let painted: IProduct = new Decorator(scluptured);
painted.setName('Painted');
painted.setPrice(28500);

console.log(painted.getName());  // Painted Scluptured Lemari
console.log(painted.getPrice()); // 603500
