import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CardProvider} from '../../providers/card.provider';
import {AlertsService} from '../../services/alerts.service';
import {DeckProvider} from '../../providers/deck.provider';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.page.html',
  styleUrls: ['./create-deck.page.scss'],
})
export class CreateDeckPage implements OnInit {
  pagClassCard = 1;
  pagNeutralCard = 1;
  pagChooseCard = 1;
  contador = 0;
  hiddenBtnSave = true;
  defaultImg = 'assets/images/back.png';

  className: any;
  classCards: Array<any> = [];
  neutralCards: Array<any> = [];
  choosenCards: Array<any> = [];

  cards: string;

  constructor(
    public router: Router,
    public cardService: CardProvider,
    public alertService: AlertsService,
    public deckProvider: DeckProvider,
  ) {
    this.className = this.router.getCurrentNavigation().extractedUrl.queryParams.className;
    this.cards = 'card_class';
    this.cardService.getLocalCards().then(res => {
      this.classCards = res.filter(c => c.playerClass === this.className).map((c) => {
        c.count = 0;
        return c;
      });
      this.neutralCards = res.filter(c => c.playerClass === 'Neutral').map((c) => {
        c.count = 0;
        return c;
      });
    });
  }

  ngOnInit() {
  }


  addCardToDeck(card) {
    if (this.contador === 50) {
      this.hiddenBtnSave = false;
      this.alertService.presentAlert('Limite de cartas alcanzado', '', '');
    } else {
      const addCard = card.playerClass === 'Neutral' ?
        this.neutralCards.find(c => c.cardId === card.cardId) :
        this.classCards.find(c => c.cardId === card.cardId);

      if (addCard.count < 4) {
        addCard.count++;
        this.contador++;
        console.log(this.contador);
        if (!this.choosenCards.find(c => c.cardId === card.cardId)) {
          this.choosenCards.push(addCard);
        }
      }
      if (this.contador === 50) {
        this.hiddenBtnSave = false;
      } else {
        this.hiddenBtnSave = true;
      }
    }
  }

  removeCardDeck(card) {
    const subtracCard = card.playerClass === 'Neutral' ?
      this.neutralCards.find(c => c.cardId === card.cardId) :
      this.classCards.find(c => c.cardId === card.cardId);

    if (subtracCard.count > 0) {
      subtracCard.count--;
      this.contador--;

      if (subtracCard.count === 0) {
        const indexCard = this.choosenCards.findIndex(c => c.id === card.id);
        if (indexCard > -1) {
          this.choosenCards.splice(indexCard, 1);
        }
      }
      if (this.contador === 50) {
        this.hiddenBtnSave = false;
      } else {
        this.hiddenBtnSave = true;
      }
    }
  }

  saveDeck() {
    console.log('1');
    return new Promise((resolve, reject) => {
      this.alertService.presentAlertToSaveDeck().then(res => {
        this.deckProvider.saveLocalDeck(res).then(result => {
          console.log('FINISH INSERT DECK', result);
        });
      });
    });
    /*this.deckProvider.saveLocalDeck(this.choosenCards).then(res => {
    }).catch(err => {
      console.log(err);
      this.alertService.presentAlert('Error al guardar mazo', '','',false);
    });*/
  }
}
