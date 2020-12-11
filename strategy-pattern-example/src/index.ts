import { Baby } from './Baby';
import { Teenager } from './Teenager';
import { Adult } from './Adult';
import { NoGreet } from './NoGreet'
import { ProperGreet } from './ProperGreet'

let baby: Baby = new Baby('John', 'Doe');
baby.setGreet(new NoGreet(baby));
baby.greet.execute();

let teenager: Teenager = new Teenager('Liu', 'Bei');
teenager.setGreet(new ProperGreet(teenager));
teenager.greet.execute();

let adult: Adult = new Adult('Zhuge', 'Liang');
adult.setGreet(new ProperGreet(adult));
adult.greet.execute();
