import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/';
import { SQLite } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private options = { name: 'bc.db', location: 'default'};
  constructor(private sqlite: SQLite) {
    console.log('[Database][constructor]');
    this.init();
  }

  /**
   * Init - init database etc. PS! Have to wait for Platform.ready
   */
  init(): Promise<any> {
    console.log('[Database][init]');
    return new Promise<void>(resolve => {
      this.sqlite.create(this.options).then((db: SQLiteObject) => {
        console.log('--> running on device: ', db);
        resolve();
      });
    });
  }

  /**
   * query - executes sql
   */
  query(q: string, params?: any): Promise<any> {
    console.log('[Database][query]', q, params);
    return new Promise((resolve, reject) => {
      this.sqlite.create(this.options).then((db: SQLiteObject) => {
        db.executeSql(q, params)
          .then((data) => {
            resolve(data.rows);
          }).catch((_err) =>{
          console.log('Error ', _err);
          console.error(_err+q);
          reject();
        });
      });
    });
  }
}
