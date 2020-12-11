import { IObserver } from './IObserver';

export class Customer implements IObserver {
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
