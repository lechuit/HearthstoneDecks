import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDeckPage } from './edit-deck.page';

const routes: Routes = [
  {
    path: '',
    component: EditDeckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDeckPageRoutingModule {}
