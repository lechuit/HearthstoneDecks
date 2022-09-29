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
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertToSaveDeck() {
    return new Promise<object>(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Ingrese nombre del mazo',
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
