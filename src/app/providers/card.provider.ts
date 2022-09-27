import { Injectable } from '@angular/core';
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
        CREATE TABLE IF NOT EXISTS cards (
                             cardId INTEGER UNIQUE,
                             cardSet TEXT,
                             faction TEXT,
                             text TEXT,
                             playerClass TEXT,
                             type TEXT,
                             PRIMARY KEY(cardId)
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
    console.log('DESDE SAVE LOCAL',dataArrayCards);
  }
}
