import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    public db: DatabaseService,
    public platform: Platform,
  ) {
  }

  init = () => {
    console.log('[Configs][init]');
    return new Promise((resolve, reject) => {
      this.db.query(`
      CREATE TABLE IF NOT EXISTS checklists(
        checklistId NUMBER,
        statusId NUMBER,
        propertyId NUMBER,
        ownerId NUMBER,
        projectId NUMBER,
        stageId NUMBER,
        typeId NUMBER,
        propertyTypeId NUMBER,
        templateId NUMBER,
        data TEXT,
        created DATE,
        updated DATE,
        checklistPadreId NUMBER,
    apiHost TEXT,
    appVersion TEXT
      )`)
        .then(_res => {
          resolve(_res);
        })
        .catch(_err => {
          reject(_err);
        });
    });
  }
}
