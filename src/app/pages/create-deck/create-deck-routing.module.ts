import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDeckPage } from './create-deck.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDeckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDeckPageRoutingModule {}
