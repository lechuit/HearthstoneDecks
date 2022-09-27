// db.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bc.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.importBC();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }


  async importBC() {
    const imported = await Storage.get({ key: 'imported' });
    const validate = imported.value;
    if(validate !== 'yes') {
      this.httpClient.get(
        'assets/dump.sql',
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            Storage.set({
              key: 'imported',
              value: 'yes',
            });
            this.isDbReady.next(true);

          })
          .catch(error => console.error(error));
      });
    }
  }

}
