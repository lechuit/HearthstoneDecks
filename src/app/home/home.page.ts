import { Component } from '@angular/core';
import {InitService} from '../services/init.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public Init: InitService,
  ) {}

}
