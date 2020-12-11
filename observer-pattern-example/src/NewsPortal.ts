import { ISubject } from './ISubject';
import { INews } from './INews';
import { IObserver } from './IObserver';

export class NewsPortal implements ISubject, INews {
  private news: string;
  private observers: IObserver[] = [];

  registerObserver(observer: IObserver): boolean { // Menambahkan observer ke list observers
    if (this.observers.includes(observer)) {
      return false;
    }
    this.observers.push(observer);
    return true;
  }

  removeObserver(observer: IObserver): boolean { // Menghapus observer dari list observers
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return false;
    }
    this.observers.splice(observerIndex, 1);
    return true;
  }

  notifyObserver(): void { // Memanggil method update semua observer yang ada pada list observers
    for (const observer of this.observers) {
      observer.update(this.news); // Mengirimkan update data ke observer
    }
  }

  setNews(value: string): void { // Apabila terjadi update pada value property news
    this.news = value;
    this.notifyObserver(); // Maka panggil method notifyObserver
  }

  getNews(): string {
    return this.news;
  }
}
