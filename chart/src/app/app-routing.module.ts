import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChartComponent} from './barchart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent,
  },{ path: 'chart', component: ChartComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
