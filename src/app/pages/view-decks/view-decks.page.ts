import { Component, OnInit } from '@angular/core';
import {DeckProvider} from '../../providers/deck.provider';

@Component({
  selector: 'app-view-decks',
  templateUrl: './view-decks.page.html',
  styleUrls: ['./view-decks.page.scss'],
})

export class ViewDecksPage implements OnInit {
  heroes: Array<{className: string; image: string}>;
  decks: any = [];

  classCards: Array<any> = [];
  constructor(
    public deckProvider: DeckProvider,
  ) {
    this.heroes=[
      { className: 'Warrior', image: '/assets/images/garrosh.png' },
      { className: 'Shaman', image: '/assets/images/thrall.png' },
      { className: 'Rogue', image: '/assets/images/valeera.png' },
      { className: 'Paladin', image: '/assets/images/uther.png' },
      { className: 'Hunter', image: '/assets/images/rexxar.png' },
      { className: 'Druid', image: '/assets/images/malfurion.png' },
      { className: 'Warlock', image: '/assets/images/guldan.png' },
      { className: 'Mage', image: '/assets/images/jaina.png' },
      { className: 'Priest', image: '/assets/images/anduin.png' }
    ];

    this.deckProvider.getAllDEcks().then(res => {
      return new Promise<any>(resolve => {
        let i = 1;
        const arrayDecks = [];
        res.forEach(resItem => {
          const hero = this.heroes.find(item => item.className === resItem.playerClass);
          resItem.img = hero.image;
          i++;
          arrayDecks.push(resItem);
          if (i > res.length){
            resolve(arrayDecks);
          }
        });
      }).then(resul => {
        this.decks = resul;
        console.log(this.decks);
      });
    });
  }

  ngOnInit() {
  }

  editDeck() {
    console.log('edit');
  }
}
