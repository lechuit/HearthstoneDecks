import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CardProvider} from '../providers/card.provider';
import {AlertsService} from './alerts.service';
import {DeckProvider} from '../providers/deck.provider';
import {NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(
    public cardService: CardProvider,
    public alertService: AlertsService,
    public deckProvider: DeckProvider,
    public navCtrl: NavController
  ) {
  }

  insertLocalDeck(choosenCards, playerClass) {
    return new Promise((resolve, reject) => {
      this.alertService.presentAlertToSaveDeck().then(nameDeck => {
        this.deckProvider.saveLocalDeck(nameDeck,playerClass).then(() => {
          this.deckProvider.getLocalDeckByName(nameDeck).then(result => {
            this.deckProvider.saveLocalDeckCards(result.deckId, choosenCards).then(res => {
              this.alertService.presentAlert('Mazo guardado!', '', '').then(r => {
                resolve(r);
              });
            }).catch(err => {
              reject(err);
            });
          }).catch(err => {
            reject(err);
          });
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    }).then(() => {
      this.navCtrl.navigateForward('/choose-hero', {animationDirection:'back'});
    });
  }
}
