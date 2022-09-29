import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CardProvider} from '../../providers/card.provider';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.page.html',
  styleUrls: ['./create-deck.page.scss'],
})
export class CreateDeckPage implements OnInit {

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
      console.log(res);
      this.classCards = res.filter(c => c.playerClass === this.className).map((c) => { c.count = 0; return c; });
      this.neutralCards = res.filter(c => c.playerClass === 'Neutral').map((c) => { c.count = 0; return c; });
    });
  }

  ngOnInit() {
  }


  addDeck(card) {
    const plusCard = card.playerClass === 'Neutral' ?
      this.neutralCards.find(c => c.cardId === card.cardId) :
      this.classCards.find(c => c.cardId === card.cardId);

    console.log('help');
    console.log(plusCard);

    console.log(plusCard.count);

    if (plusCard.count < 4) {
      plusCard.count++;
      console.log(plusCard.count);
      console.log(this.choosenCards);

      if (!this.choosenCards.find(c => c.cardId === card.cardId)) {
        this.choosenCards.push(plusCard);
      }
    }
  }

  removeDeck(card) {
    console.log('test');
  }


}
