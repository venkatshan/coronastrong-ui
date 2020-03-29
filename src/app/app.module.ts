import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { CoronaClusterCountComponent } from './components/pages/datacollection/corona-cluster-count/corona-cluster-count.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './components/pages/common/header/header.component';
import { FooterComponent } from './components/pages/common/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CoronaClusterCountComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
