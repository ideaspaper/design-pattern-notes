import { NewsPortal } from './NewsPortal';
import { Customer } from './Customer';

let cnnNews = new NewsPortal();

let johnDoe = new Customer('John', 'Doe');
let abigailAstro = new Customer('Abigail', 'Astro');
let jamesWood = new Customer('James', 'Wood');

let acongSuherman = new Customer('Acong', 'Suherman');

cnnNews.registerObserver(johnDoe);
cnnNews.registerObserver(abigailAstro);
cnnNews.registerObserver(jamesWood);

cnnNews.setNews("Fitch Assigns Rakuten International Commercial Bank First-Time 'A(twn)'; Outlook Negative");
cnnNews.setNews("Disney unveils Star, its Hulu replacement for international Disney Plus subscribers");
