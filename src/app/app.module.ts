import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreensaverComponent } from './components/screensaver/screensaver.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [AppComponent, ScreensaverComponent, SummaryComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
