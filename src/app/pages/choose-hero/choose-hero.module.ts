import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseHeroPageRoutingModule } from './choose-hero-routing.module';

import { ChooseHeroPage } from './choose-hero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseHeroPageRoutingModule
  ],
  declarations: [ChooseHeroPage]
})
export class ChooseHeroPageModule {}
