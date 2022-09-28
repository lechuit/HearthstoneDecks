import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-hero',
  templateUrl: './choose-hero.page.html',
  styleUrls: ['./choose-hero.page.scss'],
})
export class ChooseHeroPage implements OnInit {
  heroes: Array<{className: string; image: string}>;
  constructor(
    public router: Router
  ) {
    this.heroes=[
      { className: 'warrior', image: '/assets/images/garrosh.png' },
      { className: 'shaman', image: '/assets/images/thrall.png' },
      { className: 'rogue', image: '/assets/images/valeera.png' },
      { className: 'paladin', image: '/assets/images/uther.png' },
      { className: 'hunter', image: '/assets/images/rexxar.png' },
      { className: 'druid', image: '/assets/images/malfurion.png' },
      { className: 'warlock', image: '/assets/images/guldan.png' },
      { className: 'mage', image: '/assets/images/jaina.png' },
      { className: 'priest', image: '/assets/images/anduin.png' }
    ];
  }

  ngOnInit() {
  }

  chooseClass(className: string) {
    /*this.navCtrl.push(DeckPage, {
      'className': className
    });*/
    this.router.navigate(['/create-deck'],{queryParams:{className}});
  }
}
