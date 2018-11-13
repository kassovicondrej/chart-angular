import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './barchart/chart.component';
import { AppRoutingModule } from './/app-routing.module';
import {ChartsModule} from 'ng2-charts';
import { ChartchildComponent } from './chartchild/chartchild.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartchildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
