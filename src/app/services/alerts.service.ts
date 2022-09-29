import { Injectable } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private alertController: AlertController,
    public navCtrl: NavController
  ) { }

  async presentAlert(message, subHeader, header) {
    return new Promise<void>(async (resolve, reject) => {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      backdropDismiss: false,
      buttons: [{
        text: 'OK',
        handler: () => {
          resolve();
        }
      }],
    });
    await alert.present();
    });
  }

  async presentAlertToSaveDeck() {
    return new Promise<object>(async (resolve, reject) => {
      const alert = await this.alertController.create({
        subHeader: 'Ingrese nombre del mazo',
        backdropDismiss: false,
        inputs: [
          {
            name: 'name',
            placeholder: 'name'
          }
        ],
        buttons: [{
          text: 'OK',
          handler: data => {
            resolve(data);
          }
        }],
      });
      await alert.present();
    });
  }
}
