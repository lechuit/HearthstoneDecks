import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { NavController } from '@ionic/angular';

import { InitProvider } from './providers/init.service';
import {CardService} from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public Init: InitProvider,
    public cardService: CardService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.show();
      this.Init.initDatabase().then(resul => {
         this.cardService.loadCard();
        //this.navCtrl.navigateForward('/intro');
      });
    });
  }
}
