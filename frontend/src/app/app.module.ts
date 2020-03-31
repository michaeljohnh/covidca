import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { ListComponent } from './list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

import { FrameworkComponent } from './framework/framework.component';
import {RouterModule} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DistancePipe } from './distance.pipe';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { NumbersComponent } from './numbers/numbers.component';

@NgModule({
  declarations: [
    ListComponent,
    FrameworkComponent,
    AboutComponent,
    DistancePipe,
    LocationDetailsComponent,
    NumbersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,

    RouterModule.forRoot([
      {
        path:'',
        component: NumbersComponent
      },
      {
        path:'about',
        component: AboutComponent
      },
      {
        path:'location/:locationId',
        component: LocationDetailsComponent
      },
      {
        path:'stats',
        component: NumbersComponent
      },
      {
        path:'hospitals',
        component: ListComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
