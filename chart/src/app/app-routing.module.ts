import { ChartchildComponent } from './chartchild/chartchild.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './barchart/chart.component';

const routes: Routes = [
  { path: '',   redirectTo: '/chart', pathMatch: 'full' },
   { path: 'chart', component: ChartComponent },
  // { path: 'chartchild', component: ChartchildComponent, data : {some_data : 'some value'} },
  { path: 'chartchild', component: ChartchildComponent },
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
