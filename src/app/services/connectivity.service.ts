import { Injectable } from '@angular/core';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Platform } from '@ionic/angular';

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
    if(this.onDevice && this.network.type != 'none'){
      return true;
    } else {
      return navigator.onLine;
    }
  }
}
