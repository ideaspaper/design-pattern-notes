import { IProduct } from './IProduct';

export class Product implements IProduct {
  private name: string;
  private price: number;

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
