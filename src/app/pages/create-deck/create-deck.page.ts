import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CardProvider} from '../../providers/card.provider';

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
  defaultImg = 'assets/images/back.png';

  className: any;
  classCards: Array<any> = [];
  neutralCards: Array<any> = [];
  choosenCards: Array<any> = [];

  cards: string;

  constructor(
    public router: Router,
    public cardService: CardProvider,
  ) {
    this.className = this.router.getCurrentNavigation().extractedUrl.queryParams.className;
    this.cards = 'card_class';
    this.cardService.getLocalCards().then(res => {
      this.classCards = res.filter(c => c.playerClass === this.className).map((c) => { c.count = 0; return c; });
      this.neutralCards = res.filter(c => c.playerClass === 'Neutral').map((c) => { c.count = 0; return c; });
    });
  }

  ngOnInit() {
  }


  addDeck(card) {
    if (this.contador === 50){
      console.log('Limite de cartas en el mazo');
    }else {
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
    }
  }

  removeDeck(card) {
    const subtracCard = card.playerClass === 'Neutral' ?
      this.neutralCards.find(c => c.cardId === card.cardId) :
      this.classCards.find(c => c.cardId === card.cardId);

    if (subtracCard.count > 0) {
      subtracCard.count--;
      this.contador--;

      if (subtracCard.count === 0) {
        const indexCard = this.choosenCards.findIndex(c => c.id === card.id);
        if (indexCard > -1) {
          this.choosenCards.splice(indexCard , 1);
        }
      }
    }
  }

  saveDeck() {
    console.log(this.choosenCards);
  }
}
