import { Component, OnInit } from '@angular/core';
import {DeckProvider} from '../../providers/deck.provider';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  heroes: Array<{className: string; image: string}>;
  public decks: any;
  constructor(
    public deckProvider: DeckProvider,
    public router: Router
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

    this.deckProvider.getAllDEcks().then(res => new Promise<any>(resolve => {
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
      }));

  }

  ngOnInit() {
  }

  editDeck(deckId) {
      this.router.navigate(['/edit-deck'],{queryParams:{deckId}});
  }

}
