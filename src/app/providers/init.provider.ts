import { Injectable } from '@angular/core';

import {CardProvider} from './card.provider';
import {DbProvider} from './db.provider';
import {DeckProvider} from './deck.provider';

@Injectable({
  providedIn: 'root'
})
export class InitProvider {

  constructor(
    public card: CardProvider,
    public db: DbProvider,
    public deckProvider: DeckProvider,
  ) { }

  initDatabase() {
    console.log('INIT DB');
    return new Promise((resolve, reject) => {
      const initCardProvider = this.card.init();
      const initDeckProvider = this.deckProvider.init();
      Promise.all([
        initCardProvider,
        initDeckProvider
      ]).then(values => {
        resolve(values);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
