import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseHeroPage } from './choose-hero.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseHeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseHeroPageRoutingModule {}
