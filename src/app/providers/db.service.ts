// db.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  private options = { name: 'bc.db', location: 'default'};
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bc.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          //this.importBC();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  query(q: string, params?: any): Promise<any> {
    console.log('[Database][query]', q, params);
    return new Promise((resolve, reject) => {
      this.sqlite.create(this.options).then((db: SQLiteObject) => {
        db.executeSql(q, params)
          .then((data) => {
            resolve(data.rows);
          }).catch((_err) =>{
          reject(_err);
        });
      });
    });
  }
}
