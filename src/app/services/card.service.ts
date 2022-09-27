import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import {CardProvider} from '../providers/card.provider';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    public card: CardProvider
  ) { }

  loadCard() {
    console.log('[Load][Cards]');
    return new Promise( (resolve, reject) => {
       this.getCardsFromApi().then(({data}) => {
         //console.log(data);
         var arrayDataCards = this.card.saveLocalSqliteCards(data);
       });
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
          //TODO
          //data: JSON.stringify(_data)}
        });
      getCards.then(res => {
        resolve(res);
      });
    });
  }
}
