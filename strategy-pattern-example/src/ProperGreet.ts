import { Human } from './Human';
import { IGreet } from './IGreet';

export class ProperGreet implements IGreet {
  private owner: Human;
  
  constructor(owner) {
    this.owner = owner;
  }

  execute(): void {
    console.log(`Halo nama saya adalah ${this.owner.getFirstName()} ${this.owner.getLastName()}.`);
  }
}
