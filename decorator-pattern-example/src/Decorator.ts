import { IProduct } from './IProduct'

export class Decorator implements IProduct {
  protected name: string;
  protected price: number;
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
