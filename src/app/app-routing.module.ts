import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'create-deck',
    loadChildren: () => import('./pages/create-deck/create-deck.module').then( m => m.CreateDeckPageModule)
  },
  {
    path: 'choose-hero',
    loadChildren: () => import('./pages/choose-hero/choose-hero.module').then( m => m.ChooseHeroPageModule)
  },
  {
    path: 'view-decks',
    loadChildren: () => import('./pages/view-decks/view-decks.module').then( m => m.ViewDecksPageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./pages/view/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'edit-deck',
    loadChildren: () => import('./pages/edit-deck/edit-deck.module').then( m => m.EditDeckPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
