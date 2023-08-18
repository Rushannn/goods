import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsListContainerComponent } from './features/goods/goods-list-container/goods-list-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'goods',
    pathMatch: 'full'
  },
  {
    path: 'goods',
    component: GoodsListContainerComponent
  },
  {
    path: '**',
    redirectTo: 'goods',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
