import { IObserver } from './IObserver'

export interface ISubject {
  registerObserver(observer: IObserver): boolean;
  removeObserver(observer: IObserver): boolean;
  notifyObserver(): void;
}
