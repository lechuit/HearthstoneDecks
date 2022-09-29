import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Network } from '@awesome-cordova-plugins/network/ngx';

import { HttpClientModule } from '@angular/common/http';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule, ScrollHooks} from 'ng-lazyload-image';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, LazyLoadImageModule],
  providers: [
    SplashScreen,
    SQLite,
    SQLitePorter,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenOrientation
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
