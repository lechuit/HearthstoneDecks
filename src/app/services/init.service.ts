import { Injectable } from '@angular/core';

import {CardService} from './card.service';
import {DatabaseService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    public Card: CardService,
    public DbService: DatabaseService
  ) { }

  initDatabase() {
    console.log('INIT DB');
    return new Promise((resolve, reject) => {
      var initCardService = this.Card.init();
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
