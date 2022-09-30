import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';

import {Attributes, IntersectionObserverHooks, LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule} from 'ng-lazyload-image';
import {NgxPaginationModule} from 'ngx-pagination';

export class LazyLoadImageHooks extends IntersectionObserverHooks {
  setup(attributes: Attributes) {
    attributes.offset = 10;
    attributes.defaultImagePath = 'assets/images/back.png';
    attributes.errorImagePath = 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/' +
      '49715e42324ffb11328cf4aa8ec3e7ad0b48bb6c45dba17eb42f53a8f162b554.png';
    return super.setup(attributes);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPageRoutingModule,
    LazyLoadImageModule,
    NgxPaginationModule
  ],
  declarations: [ViewPage],
  providers: [{provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks}],
})
export class ViewPageModule {}
