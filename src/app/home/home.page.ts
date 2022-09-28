import { Component } from '@angular/core';
import {InitProvider} from '../providers/init.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public Init: InitProvider,
  ) {}

}
