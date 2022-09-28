import { Injectable } from '@angular/core';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Platform } from '@ionic/angular';



var Connection;
@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  onDevice: boolean;
  constructor(
    public platform: Platform,
    public network: Network
  ) {
    console.log('[Connectivity][constructor]');
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    console.log('[Connectivity][isOnline]');
    console.log(this.network.type);
    console.log(this.onDevice);
    if(this.onDevice && this.network.type != 'none'){
      return true;
    } else {
      return navigator.onLine;
    }
  }
}
