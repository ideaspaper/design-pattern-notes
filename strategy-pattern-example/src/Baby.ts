import { Human } from './Human';
import { IGreet } from './IGreet';

export class Baby extends Human {
  greet: IGreet = <IGreet>{};

  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }

  setGreet(greetStrategy: IGreet): void {
    this.greet = greetStrategy;
  }
}
