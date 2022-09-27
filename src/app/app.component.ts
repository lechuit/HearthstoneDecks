import { Component } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './services/database.service';
import { InitService } from './services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private databaseService: DatabaseService,
    private loadingCtrl: LoadingController,
    public Init: InitService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.Init.initDatabase();
  }
}
