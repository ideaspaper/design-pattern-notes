import { Human } from './Human';
import { IGreet } from './IGreet';

export class NoGreet implements IGreet {
  private owner: Human;
  
  constructor(owner) {
    this.owner = owner;
  }

  execute(): void {
    console.log('Nyenyenye...')
  }
}
