export class Human {
  private firstName: string;
  private lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

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
