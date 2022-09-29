import {Injectable} from '@angular/core';
import {DbProvider} from './db.provider';
import {resolve} from "@angular/compiler-cli";

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

  saveLocalDeck(name) {
    return new Promise<void>((resolve, reject) => {
      this.db.query(`INSERT
      OR IGNORE INTO deck(deckName) VALUES ("${name.name}")`).then(res => {
        resolve(res[0]);
      }).catch(_err => {
        reject(_err);
      });
    });
  }

  getLocalDeckByName(name) {
    return new Promise<any>((resolve, reject) => {
      this.db.query(`SELECT *
                     FROM deck
                     WHERE deckName = "${name.name}"`).then(res => {
        resolve(res.item(0));
      }).catch(_err => {
        reject(_err);
      });
    });
  }

  saveLocalDeckCards(deckId, arrayChooseCards) {
    return new Promise<void>((resolve, reject) => {
      Object.keys(arrayChooseCards).forEach(key => {
        console.log(`INSERT
        OR IGNORE INTO deckCards (deckId, cardId, amount)
        VALUES (
        ${deckId},
        "${arrayChooseCards[key].cardId}",
        ${arrayChooseCards[key].count}
        )`);
        this.db.query(`INSERT
        OR IGNORE INTO deckCards (deckId, cardId, amount)
        VALUES (
        ${deckId},
        "${arrayChooseCards[key].cardId}",
        ${arrayChooseCards[key].count}
        )`).then(() => {
          resolve();
        }).catch(_err => {
          reject(_err);
        });
      });
    });
  }
}
