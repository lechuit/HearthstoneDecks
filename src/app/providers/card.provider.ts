import {Injectable} from '@angular/core';
import {DbProvider} from './db.provider';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CardProvider {

  constructor(
    public db: DbProvider,
    public platform: Platform,
  ) {
  }

  init = () => {
    console.log('[Configs][init]');
    return new Promise((resolve, reject) => {
      this.db.query(`
        CREATE TABLE IF NOT EXISTS cards
        (
          cardId
          TEXT
          UNIQUE,
          name_
          TEXT,
          cardSet
          TEXT,
          faction
          TEXT,
          img
          TEXT,
          playerClass
          TEXT,
          type_
          TEXT,
          PRIMARY
          KEY
        (
          cardId
        )
          )`)
        .then(_res => {
          resolve(_res);
        })
        .catch(_err => {
          reject(_err);
        });
    });
  };

  saveLocalSqliteCards(dataArrayCards) {
    return new Promise<void>((resolve, reject) => {
      Object.keys(dataArrayCards).forEach(key => {
        Array.from(dataArrayCards[key]).forEach(card => new Promise(() => {
            if (card['img']) {
              this.db.query('INSERT OR IGNORE INTO cards (cardId, name_, cardSet, faction, img, playerClass, type_) ' +
                'VALUES ("'+card["cardId"]+'","'+card["name"]+'","'+card["cardSet"]+'","'+card["faction"]+'","'+card["img"]+'","'+
                card["playerClass"]+'","'+card["type"]+'")');
            }
          }).then(res => {
            console.log(res);
          }));
      });
      resolve();
    }).then(res => {
      console.log('FINISH INSERT');
    });
  }

  getLocalCards() {
    console.log('[Checklist][getLocalChecklists]');
    return new Promise<void>((resolve, reject) => {
      try {
        this.db.query('SELECT * FROM checklists')
          .then(_res => {
            if(_res.length > 0){
              resolve(_res.item);
            }else{
              resolve();
            }
          })
          .catch(_err => {
            console.error(_err);
            reject(_err);
          });
      } catch (error) {
        console.error('Config.checkKey',new Error('Se produjo una excepción'));
        reject(new Error('Se produjo una excepción'));
      }
    });
  }
}
