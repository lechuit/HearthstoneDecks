import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CardProvider} from '../../providers/card.provider';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.page.html',
  styleUrls: ['./create-deck.page.scss'],
})
export class CreateDeckPage implements OnInit {

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
      this.classCards = res.filter(class_ => class_.hero === this.className);
      this.neutralCards = res.filter(class_ => class_.hero === 'neutral');
    });
    console.log(this.classCards);
    console.log(this.neutralCards);
  }

  ngOnInit() {
  }

}
