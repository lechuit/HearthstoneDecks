import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import {CardProvider} from '../providers/card.provider';
import {ConnectivityService} from './connectivity.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    public card: CardProvider,
    public connectivity: ConnectivityService,
  ) { }

  loadCards() {
    console.log('[Load][Cards]');
    return new Promise( (resolve, reject) => {
      if(this.connectivity.isOnline()) {
        this.card.getLocalCards().then(res => {
          if (res.length === 0){
            this.getCardsFromApi().then(({data}) => {
              const arrayDataCards = this.card.saveLocalSqliteCards(data);
              resolve(res);
            });
          }else {
            resolve(res);
          }
        });
      }else {
        console.log('OFF-LINE');
        this.card.getLocalCards().then(res => {
          resolve(res);
        });
      }
    });
  }

  getCardsFromApi() {
    return new Promise((resolve, reject) => {
      const endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards';
      const getCards = Http.get(
        {
          url: endPoint,
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'X-RapidAPI-Key': '9946fbb6b1msh1fcc8529682e182p1dc023jsnf56c5836d4bc'
          },
          params: {
            locale: 'esMX'
          }
        });
      getCards.then(res => {
        resolve(res);
      });
    });
  }
}
