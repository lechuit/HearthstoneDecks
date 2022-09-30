import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDeckPageRoutingModule } from './edit-deck-routing.module';

import { EditDeckPage } from './edit-deck.page';
import {NgxPaginationModule} from "ngx-pagination";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDeckPageRoutingModule,
    NgxPaginationModule,
    LazyLoadImageModule
  ],
  declarations: [EditDeckPage]
})
export class EditDeckPageModule {}
