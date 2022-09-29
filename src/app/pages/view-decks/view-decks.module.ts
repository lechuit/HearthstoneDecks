import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDecksPageRoutingModule } from './view-decks-routing.module';

import { ViewDecksPage } from './view-decks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDecksPageRoutingModule
  ],
  declarations: [ViewDecksPage]
})
export class ViewDecksPageModule {}
