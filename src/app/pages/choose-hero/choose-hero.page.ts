import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
