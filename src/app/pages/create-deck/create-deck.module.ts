import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDeckPageRoutingModule } from './create-deck-routing.module';

import { CreateDeckPage } from './create-deck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDeckPageRoutingModule
  ],
  declarations: [CreateDeckPage]
})
export class CreateDeckPageModule {}
