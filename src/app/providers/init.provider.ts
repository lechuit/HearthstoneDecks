import { Injectable } from '@angular/core';

import {CardProvider} from './card.provider';
import {DbProvider} from './db.provider';

@Injectable({
  providedIn: 'root'
})
export class InitProvider {

  constructor(
    public card: CardProvider,
    public db: DbProvider
  ) { }

  initDatabase() {
    console.log('INIT DB');
    return new Promise((resolve, reject) => {
      const initCardService = this.card.init();
      Promise.all([
        initCardService
      ]).then(values => {
        resolve(values);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
