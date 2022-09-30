import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CardProvider} from '../../providers/card.provider';
import {AlertsService} from '../../services/alerts.service';
import {NavController} from '@ionic/angular';
import {DeckService} from '../../services/deck.service';
import {DeckProvider} from "../../providers/deck.provider";

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.page.html',
  styleUrls: ['./edit-deck.page.scss'],
})
export class EditDeckPage implements OnInit {
  pagClassCard = 1;
  pagNeutralCard = 1;
  pagChooseCard = 1;
  contador = 0;
  sum = 0;
  hiddenBtnSave = true;
  defaultImg = 'assets/images/back.png';

  className: any;
  data: Array<any>;
  deckId: any;
  classCards: Array<any> = [];
  neutralCards: Array<any> = [];
  choosenCards: Array<any> = [];

  cards: string;

  constructor(
    public router: Router,
    public cardService: CardProvider,
    public alertService: AlertsService,
    public navCtrl: NavController,
    public deckService: DeckService,
    public deckProvider: DeckProvider
  ) {
    //let sum;
    this.deckId = this.router.getCurrentNavigation().extractedUrl.queryParams.deckId;
    this.deckProvider.getAllCardInDeck(this.deckId).then(res => {
      this.className = res[0].playerClass;
      this.data = res;
      this.choosenCards =res;
      for(let i = 0; i <= res.length; i++){
        console.log(res[i]);
        console.log(res[i].amount);
        if (typeof res[i] !== 'undefined') {
          this.contador += res[i].amount;
        }
      }
    });

    if (this.className === 'undefined'){
      this.navCtrl.navigateForward('/choose-hero',{animationDirection:'back'});
    }
    this.cards = 'card_class';
    this.cardService.getLocalCards().then(res => {
      this.classCards = res.filter(c => c.playerClass === this.className).map((c) => {
        //const test = this.data.find(item => item.cardId === c.cardId);
        c.count = 0;
        return c;
      });

      this.neutralCards = res.filter(c => c.playerClass === 'Neutral').map((c) => {
        c.count = 0;
        return c;
      });

      this.classCards.forEach(_res => {
        const test = this.data.find(item => item.cardId === _res.cardId);
        if (typeof test !== 'undefined') {
          this.sum +=test.amount;
          _res.count = test.amount;
        }
      });

      this.neutralCards.forEach(_res => {
        const test = this.data.find(item => item.cardId === _res.cardId);
        if (typeof test !== 'undefined') {
          this.sum += test.amount;
          _res.count = test.amount;
        }
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
    this.deckService.insertLocalDeck(this.choosenCards,this.className);
  }

}
