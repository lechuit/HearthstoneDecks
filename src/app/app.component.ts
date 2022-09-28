import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { NavController } from '@ionic/angular';

import { InitProvider } from './providers/init.provider';
import {CardService} from './services/card.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public init: InitProvider,
    public cardService: CardService,
    private navCtrl: NavController,
    public screenOrientacion: ScreenOrientation
  ) {
    this.screenOrientacion.lock(this.screenOrientacion.ORIENTATIONS.PORTRAIT);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.show();
      this.init.initDatabase().then(resul => {
         this.cardService.loadCards().then(res => {
           this.navCtrl.navigateForward('/home');
         });
      });
    });
  }
}
