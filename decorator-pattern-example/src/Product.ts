import { IProduct } from './IProduct';

export class Product implements IProduct {
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
