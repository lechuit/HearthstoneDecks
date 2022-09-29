import {Injectable} from '@angular/core';
import {DbProvider} from './db.provider';

@Injectable({
  providedIn: 'root'
})
export class DeckProvider {

  constructor(
    public db: DbProvider,
  ) {
  }

  init = () => {
    console.log('[Configs][init]');
    return new Promise<void>((resolve, reject) => {
      this.createTableDeck().then(() => {
        this.createTableDeckCards().then(() => {
          resolve();
        });
      });
    });
  };

  createTableDeck() {
    return new Promise((resolve, reject) => {
      this.db.query(`
        CREATE TABLE IF NOT EXISTS deck
        (
          deckId
          INTEGER
          UNIQUE,
          deckName
          TEXT,
          PRIMARY
          KEY
        (
          deckId
        )
          )`)
        .then(_res => {
          resolve(_res);
        })
        .catch(_err => {
          reject(_err);
        });
    });
  }

  createTableDeckCards() {
    return new Promise((resolve, reject) => {
      this.db.query(`CREATE TABLE IF NOT EXISTS deckCards
                     (
                       deckId
                       INTEGER,
                       cardId
                       TEXT,
                       amount
                       INTEGER
                     )`).then(res => {
        resolve(res);
      }).catch(_err => {
        reject(_err);
      });
    });
  }

  saveLocalDeck(choosenCards: Array<any>, name) {
    return new Promise<void>((resolve, reject) => {
      this.db.query(`INSERT OR IGNORE INTO deck(deckName) VALUES ("${name})"`).then(res=>{
        console.log('INSERT DECK',res);
        resolve(res);
      });
      console.log('en el save', choosenCards, name);
    });
  }
}
