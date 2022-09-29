import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDecksPage } from './view-decks.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDecksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDecksPageRoutingModule {}
